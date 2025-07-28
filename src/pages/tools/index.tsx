import React from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';

interface ToolCardProps {
  title: string;
  description: string;
  link: string;
  icon: string;
  category: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, description, link, icon, category }) => {
  return (
    <div className={styles.toolCard}>
      <div className={styles.toolIcon}>{icon}</div>
      <div className={styles.toolContent}>
        <h3 className={styles.toolTitle}>{title}</h3>
        <p className={styles.toolDescription}>{description}</p>
        <div className={styles.toolCategory}>{category}</div>
        <a href={link} className={styles.toolButton} target="_blank" rel="noopener noreferrer">
          使用工具
        </a>
      </div>
    </div>
  );
};

const tools = [
  {
    title: '简单计算器',
    description: '支持基本数学运算的网页计算器，具有键盘快捷键支持和清晰的用户界面。',
    link: '/tools/calculator.html',
    icon: '🧮',
    category: '计算工具'
  },
  {
    title: '单位转换器',
    description: '支持长度、重量、温度等多种单位类型的转换，实时显示转换结果。',
    link: '/tools/converter.html',
    icon: '🔄',
    category: '转换工具'
  },
  {
    title: '图表演示',
    description: '展示各种数据可视化图表，包括柱状图、饼图、折线图等，支持交互操作。',
    link: '/tools/chart-demo.html',
    icon: '📊',
    category: '数据可视化'
  }
];

const categories = ['全部', '计算工具', '转换工具', '数据可视化'];

export default function ToolsIndex(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = React.useState('全部');

  const filteredTools = selectedCategory === '全部' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  return (
    <Layout
      title="实用工具"
      description="收集了各种实用的在线工具，帮助您提高工作效率">
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>实用工具集合</h1>
          <p className={styles.heroDescription}>
            欢迎使用我们的在线工具集合！这里提供了各种实用的工具，帮助您在日常工作和学习中提高效率。
          </p>
        </div>

        <div className={styles.filterSection}>
          <h2 className={styles.sectionTitle}>工具分类</h2>
          <div className={styles.categoryFilters}>
            {categories.map(category => (
              <button
                key={category}
                className={`${styles.categoryButton} ${
                  selectedCategory === category ? styles.active : ''
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.toolsGrid}>
          {filteredTools.map((tool, index) => (
            <ToolCard
              key={index}
              title={tool.title}
              description={tool.description}
              link={tool.link}
              icon={tool.icon}
              category={tool.category}
            />
          ))}
        </div>

        <div className={styles.infoSection}>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h3>🎯 使用说明</h3>
              <ul>
                <li>点击工具卡片直接访问对应工具</li>
                <li>大部分工具支持键盘快捷键操作</li>
                <li>所有工具都支持移动设备访问</li>
                <li>所有计算都在本地进行，保护您的数据安全</li>
              </ul>
            </div>
            
            <div className={styles.infoCard}>
              <h3>🔧 技术特性</h3>
              <ul>
                <li>纯前端实现，无需服务器</li>
                <li>响应式设计，适配各种屏幕尺寸</li>
                <li>支持主流现代浏览器</li>
                <li>加载后可离线使用</li>
              </ul>
            </div>

            <div className={styles.infoCard}>
              <h3>📝 反馈建议</h3>
              <p>
                如果您有任何建议或发现问题，欢迎通过 GitHub Issues 或邮件联系我们。
                我们会持续更新和改进这些工具。
              </p>
            </div>
          </div>
        </div>

        <div className={styles.updateNotice}>
          <p><em>持续更新中，更多实用工具即将上线...</em></p>
        </div>
      </div>
    </Layout>
  );
} 