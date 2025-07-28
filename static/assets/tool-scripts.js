// 工具页面通用JavaScript函数

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // 初始化工具提示
    initTooltips();
    
    // 初始化快捷键支持
    initKeyboardShortcuts();
});

// 工具提示功能
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(event) {
    const text = event.target.getAttribute('data-tooltip');
    if (!text) return;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: #333;
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 12px;
        white-space: nowrap;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
    
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
    
    event.target._tooltip = tooltip;
}

function hideTooltip(event) {
    const tooltip = event.target._tooltip;
    if (tooltip) {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 200);
        delete event.target._tooltip;
    }
}

// 快捷键支持
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(event) {
        // Ctrl/Cmd + / 显示快捷键帮助
        if ((event.ctrlKey || event.metaKey) && event.key === '/') {
            event.preventDefault();
            showShortcutHelp();
        }
        
        // ESC 键关闭模态框
        if (event.key === 'Escape') {
            closeAllModals();
        }
    });
}

// 显示快捷键帮助
function showShortcutHelp() {
    const existing = document.getElementById('shortcut-help');
    if (existing) {
        existing.remove();
        return;
    }
    
    const modal = document.createElement('div');
    modal.id = 'shortcut-help';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 10px;
        max-width: 400px;
        width: 90%;
    `;
    
    content.innerHTML = `
        <h3 style="margin-top: 0;">快捷键帮助</h3>
        <div style="margin-bottom: 15px;">
            <strong>Ctrl/Cmd + /</strong> - 显示/隐藏此帮助
        </div>
        <div style="margin-bottom: 15px;">
            <strong>ESC</strong> - 关闭模态框
        </div>
        <div style="margin-bottom: 15px;">
            <strong>Tab</strong> - 在表单元素间切换
        </div>
        <div style="margin-bottom: 15px;">
            <strong>Enter</strong> - 确认操作
        </div>
        <button onclick="closeAllModals()" style="
            background: #007bff;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            float: right;
        ">关闭</button>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // 点击背景关闭
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeAllModals();
        }
    });
}

// 关闭所有模态框
function closeAllModals() {
    const modals = document.querySelectorAll('[id$="-help"], .modal, .overlay');
    modals.forEach(modal => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    });
}

// 通用工具函数

// 数字格式化
function formatNumber(num, decimals = 2) {
    return parseFloat(num).toFixed(decimals);
}

// 复制到剪贴板
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('已复制到剪贴板', 'success');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('已复制到剪贴板', 'success');
    } catch (err) {
        showNotification('复制失败，请手动复制', 'error');
    }
    
    document.body.removeChild(textArea);
}

// 显示通知
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // 设置颜色
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    
    notification.style.background = colors[type] || colors.info;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 本地存储工具
const Storage = {
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('存储失败:', e);
            return false;
        }
    },
    
    get: function(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('读取存储失败:', e);
            return defaultValue;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('删除存储失败:', e);
            return false;
        }
    },
    
    clear: function() {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('清空存储失败:', e);
            return false;
        }
    }
};

// 表单验证工具
const Validator = {
    email: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    phone: function(phone) {
        const re = /^1[3-9]\d{9}$/;
        return re.test(phone);
    },
    
    url: function(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },
    
    required: function(value) {
        return value !== null && value !== undefined && value.toString().trim() !== '';
    },
    
    minLength: function(value, min) {
        return value && value.toString().length >= min;
    },
    
    maxLength: function(value, max) {
        return value && value.toString().length <= max;
    },
    
    number: function(value) {
        return !isNaN(value) && isFinite(value);
    },
    
    integer: function(value) {
        return Number.isInteger(Number(value));
    }
};

// 日期格式化工具
const DateFormatter = {
    format: function(date, format = 'YYYY-MM-DD') {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes)
            .replace('ss', seconds);
    },
    
    relative: function(date) {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        
        const now = new Date();
        const diff = now - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (days > 0) return `${days}天前`;
        if (hours > 0) return `${hours}小时前`;
        if (minutes > 0) return `${minutes}分钟前`;
        return '刚刚';
    }
};

// 导出到全局作用域
window.ToolUtils = {
    formatNumber,
    copyToClipboard,
    showNotification,
    debounce,
    throttle,
    Storage,
    Validator,
    DateFormatter
}; 