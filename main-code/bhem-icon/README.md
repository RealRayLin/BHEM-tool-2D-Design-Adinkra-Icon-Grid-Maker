# BHEM Website - Black Heritage Experience Manitoba

欢迎来到BHEM (Black Heritage Experience Manitoba) 官方网站项目。这个项目致力于保护、传播和庆祝马尼托巴省的黑人文化遗产。

## 🎨 BHEM Adinkra 网格背景生成器 v2.1

### ✨ 最新版本亮点

BHEM Adinkra 网格背景生成器是一个专为BHEM品牌设计的交互式网格背景创建工具。它利用98个传统阿丁克拉（Adinkra）符号和BHEM品牌色彩方案，生成具有文化内涵的网格背景图案。

#### 🆕 v2.1 核心功能
- ✅ **对钩选择显示** - 选中颜色清晰可见
- ✅ **颜色排序选项** - 规律排序 vs 完全随机
- ⚡ **实时预览系统** - 所有设置修改即时生效
- ⬜ **强制正方形选项** - 网格单元格比例控制
- 📱 **上下布局设计** - 更适合现代屏幕
- 🎯 **智能配色推荐** - 一键获得专业配色
- 🎭 **图标透明度控制** - 创造层次效果
- 🎨 **图标颜色自定义** - 支持Hex色号输入和颜色选择器
- 📐 **预览区域优化** - 固定尺寸智能缩放显示
- 🌍 **国际化界面** - 英文界面适合全球推广
- 🎲 **启动随机配置** - 开启即显示精美预览

### 🚀 快速开始

#### 启动生成器

1. **方式一：直接打开**
   ```bash
   open bhem-grid-generator.html
   ```

2. **方式二：本地服务器**
   ```bash
   python3 -m http.server 8000
   # 然后在浏览器访问: http://localhost:8000/bhem-grid-generator.html
   ```

3. **方式三：验证测试**
   ```bash
   # 打开功能验证页面（如果可用）
   open 0-AIGcode/miscellaneous/verify_grid_generator.html
   ```

### 🎨 BHEM 品牌色彩系统

#### 主色调 (Primary Colors)
- 🟠 **橘色** (#F77C3B) - 品牌核心识别色
- 🔴 **番茄红** (#D44C2F) - 强调和警示色  
- 🟡 **浅米色** (#E9E2C5) - 背景基础色
- 🟨 **亮黄赭** (#E6AC40) - 装饰点缀色

#### 辅助色 (Secondary Colors)
- 🟤 **深棕** (#693018) - 稳重基调色
- 🟠 **活力橙** (#FA9A4C) - 活跃互动色
- 🟫 **暖黄棕** (#DB9242) - 温暖过渡色
- 🔴 **深砖红** (#B33B24) - 深度强调色

#### 中性色 (Neutral Colors)
- ⚪ **奶油白** (#F3ECD5) - 纯净衬托色
- ⚫ **深可可** (#44200F) - 文本对比色

### 📐 智能网格系统

- **可调节网格**: 2-20列，2-15行，实时调节
- **强制正方形**: 确保网格单元格统一比例
- **精确间距**: 0-15px精确控制
- **自适应画布**: 400-2000px × 300-1500px
- **实时预览**: 参数调整即时生效
- **固定预览区**: 600×450像素固定容器，智能缩放

### 🖼️ 文化图标集成

- **98个传统符号**: 完整的Adinkra图标库
- **PNG蒙层技术**: 图标颜色智能转换
- **透明度控制**: 20%-100%可调节
- **颜色自定义**: 支持Hex输入和颜色选择器
- **排列方式**: 随机或顺序可选
- **高质量输出**: 专业级图像导出

### 🎭 Adinkra符号文化意义

#### 核心符号介绍

1. **Gye Nyame** (除了神) - 象征神的全能和至高无上
2. **Sankofa** (回去取它) - 学习历史，建设未来
3. **Adinkrahene** (阿丁克拉之王) - 权威和领导力
4. **Dwennimmen** (公羊角) - 力量与谦逊的结合
5. **Akoma** (心) - 爱心、耐心和宽容

#### 文化价值

- **历史传承**: 每个符号承载着阿坎人的智慧
- **道德教育**: 通过视觉符号传递价值观
- **精神信仰**: 表达对神灵和祖先的敬畏
- **社会秩序**: 反映传统社会结构

### 📋 使用流程

1. **智能配色** - 使用"Smart Color Recommendation"或手动选择BHEM品牌颜色
2. **设置排序** - 选择"Sequential Color Order"或"Random Color Order"模式
3. **调整网格** - 设置行列数、开启"Force Square Cells"（可选）
4. **配置图标** - 调整大小、透明度、颜色和排列方式
5. **实时预览** - 开启"Real-time Auto Generate"查看即时效果
6. **导出下载** - 一键下载高质量PNG背景图

### 🛠️ 技术实现

#### 核心技术栈

- **HTML5 Canvas**: 图形渲染和生成
- **JavaScript ES6+**: 交互逻辑和数据处理
- **CSS3**: 现代UI设计和动效
- **PNG图像处理**: 像素级颜色转换

#### 关键算法

**颜色蒙层算法**
```javascript
function createColoredIcon(originalImg, color = '#ffffff', opacity = 1) {
    // 解析hex色值为RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // 应用到图标像素
    for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] > 0) {
            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;
            data[i + 3] = Math.floor(data[i + 3] * opacity);
        }
    }
    
    return tempCanvas;
}
```

**网格布局算法**
```javascript
function calculateGridLayout(canvasWidth, canvasHeight, cols, rows, gap) {
    const cellWidth = (canvasWidth - gap * (cols + 1)) / cols;
    const cellHeight = (canvasHeight - gap * (rows + 1)) / rows;
    return { cellWidth, cellHeight };
}
```

### 📊 版本对比

| 功能特性 | v1.0 | v2.0 | v2.1 | 改进说明 |
|---------|------|------|------|----------|
| 色彩选择 | 点击切换 | ✅ 对钩显示 | ✅ 对钩显示 | 视觉反馈更清晰 |
| 颜色排序 | 固定顺序 | ✅ 规律/随机可选 | ✅ 规律/随机可选 | 增加创意可能性 |
| 实时预览 | 手动生成 | ⚡ 参数即时生效 | ⚡ 参数即时生效 | 用户体验大幅提升 |
| 网格约束 | 独立调节 | ✅ 强制正方形选项 | ✅ 强制正方形选项 | 满足特定设计需求 |
| 布局方式 | 左右排列 | ✅ 上下排列 | ✅ 上下排列 | 更适合现代屏幕比例 |
| 图标透明度 | 固定100% | ✅ 20%-100%可调 | ✅ 20%-100%可调 | 增强设计灵活性 |
| 图标颜色 | 固定白色 | 固定白色 | ✅ 任意色彩可选 | 支持品牌色彩匹配 |
| 预览显示 | 原始尺寸 | 原始尺寸 | ✅ 固定区域缩放 | 统一视觉体验 |
| 界面语言 | 中文 | 中文 | ✅ 英文界面 | 国际化推广 |
| 启动体验 | 默认配置 | 默认配置 | ✅ 随机预览 | 即时展示功能 |

### 🎨 应用场景

#### 设计应用
- **网站背景**: 官网和子页面背景设计
- **印刷品**: 海报、宣传册、名片背景
- **展示材料**: 会议演示、展览背景
- **品牌应用**: 文具、包装、周边产品

#### 教育用途
- **文化教学**: Adinkra符号文化普及
- **设计教育**: 色彩搭配和网格设计教学
- **互动体验**: 博物馆和文化中心互动展示

### 📊 技术参数

| 参数 | 范围 | 默认值 | 说明 |
|------|------|--------|------|
| 网格列数 | 2-20 | 8 | 水平方向网格数量 |
| 网格行数 | 2-15 | 6 | 垂直方向网格数量 |
| 网格间距 | 0-15px | 2px | 网格之间的间隔 |
| 画布宽度 | 400-2000px | 800px | 输出图像宽度 |
| 画布高度 | 300-1500px | 600px | 输出图像高度 |
| 图标大小 | 30-100% | 70% | 图标相对网格的大小 |
| 图标透明度 | 20-100% | 100% | 图标透明度控制 |

### 🔧 故障排除

#### 常见问题解决

1. **图标加载失败**
   - 检查BHEMicon文件夹路径
   - 确认图标文件完整性
   - 查看浏览器控制台错误信息

2. **颜色显示异常**
   - 验证颜色代码格式
   - 检查浏览器颜色配置文件
   - 重新选择颜色组合

3. **下载功能无效**
   - 确认浏览器支持Canvas toDataURL
   - 检查弹窗拦截设置
   - 尝试不同的浏览器

4. **性能问题**
   - 减少网格数量 (建议最大15×12)
   - 降低画布分辨率
   - 关闭不必要的浏览器扩展

### 📁 项目结构

```
BHEMwebsite/
├── bhem-grid-generator.html              # 主生成器 v2.1
├── BHEMicon/                             # 98个阿丁克拉图标
│   ├── *.png                             # PNG格式图标文件
│   ├── README.md                         # 图标说明
│   └── 0-adinkra_icons_metadata.json     # 图标元数据
├── 0-AIGcode/                            # 开发和报告文件
│   ├── miscellaneous/                    # 测试和工具脚本
│   └── report/                           # 项目报告文档
└── README.md                             # 本文件
```

### 🚀 开发指南

#### 环境要求
- 现代浏览器 (Chrome 80+, Firefox 75+, Safari 13+)
- Python 3.x (用于本地服务器)
- 网络连接 (用于字体加载)

#### 扩展开发
- 添加预设配色方案
- 集成SVG格式导出
- 实现批量生成功能
- 开发移动端触摸支持

### 🏆 文化价值

这个工具不仅是一个技术产品，更是文化传承的载体。通过数字化方式展示和传播阿丁克拉符号，我们希望：

- **保护传统**: 数字化保存文化符号的完整性
- **教育普及**: 让更多人了解非洲文化遗产
- **创新融合**: 传统文化与现代技术的完美结合
- **品牌强化**: 提升BHEM品牌的文化底蕴

### 📊 项目状态

- ✅ BHEM网格背景生成器 v2.1.0 (最新版本)
- ✅ 英文界面国际化 (已完成)
- ✅ 启动随机配置 (已完成)
- ✅ 图标颜色自定义 (已完成)
- ✅ 预览区域优化 (已完成)
- ✅ 实时预览系统 (已完成)
- ✅ 智能配色推荐 (已完成)

### 🚀 未来规划

#### 短期目标 (1个月)
- [ ] 添加更多预设配色方案
- [ ] 支持SVG格式导出
- [ ] 移动端触摸手势优化

#### 中期目标 (3个月)
- [ ] 图标分类筛选功能
- [ ] 配色方案保存和分享
- [ ] 高级混合模式

#### 长期愿景 (6个月)
- [ ] 集成到BHEM官网CMS
- [ ] 社区分享平台
- [ ] 多语言国际化支持

---

## 📝 版本记录

### v2.1.0 (2025-01-27)
- ✅ 图标颜色自定义功能
- ✅ 预览区域固定尺寸智能缩放
- ✅ 英文界面国际化
- ✅ 启动时随机配置预览

### v2.0.0 (2025-01-27)
- ✅ 对钩选择显示系统
- ✅ 颜色排序选项（规律/随机）
- ✅ 实时预览系统
- ✅ 强制正方形功能
- ✅ 上下布局设计
- ✅ 智能配色推荐
- ✅ 图标透明度控制

### v1.0.0 (2025-01-27)
- ✅ 完整的网格背景生成功能
- ✅ BHEM品牌色彩系统集成
- ✅ 98个Adinkra图标支持
- ✅ PNG蒙层颜色转换
- ✅ 可调节网格参数
- ✅ 导出下载功能

---

# BHEM Website - Black Heritage Experience Manitoba (English)

Welcome to the BHEM (Black Heritage Experience Manitoba) official website project. This project is dedicated to preserving, promoting, and celebrating the Black cultural heritage of Manitoba.

## 🎨 BHEM Adinkra Grid Background Generator v2.1

### ✨ Latest Version Highlights

The BHEM Adinkra Grid Background Generator is an interactive grid background creation tool specifically designed for the BHEM brand. It utilizes 98 traditional Adinkra symbols and BHEM brand color schemes to generate culturally rich grid background patterns.

#### 🆕 v2.1 Core Features
- ✅ **Checkmark Selection Display** - Clearly visible selected colors
- ✅ **Color Ordering Options** - Sequential vs completely random
- ⚡ **Real-time Preview System** - All setting changes take effect instantly
- ⬜ **Force Square Option** - Grid cell ratio control
- 📱 **Vertical Layout Design** - Better suited for modern screens
- 🎯 **Smart Color Recommendation** - One-click professional color schemes
- 🎭 **Icon Transparency Control** - Create layered effects
- 🎨 **Custom Icon Colors** - Support for Hex color input and color picker
- 📐 **Preview Area Optimization** - Fixed-size intelligent scaling display
- 🌍 **Internationalized Interface** - English interface for global reach
- 🎲 **Startup Random Configuration** - Beautiful preview on launch

### 🚀 Quick Start

#### Launch Generator

1. **Method 1: Direct Open**
   ```bash
   open bhem-grid-generator.html
   ```

2. **Method 2: Local Server**
   ```bash
   python3 -m http.server 8000
   # Then visit: http://localhost:8000/bhem-grid-generator.html
   ```

3. **Method 3: Verification Test**
   ```bash
   # Open function verification page (if available)
   open 0-AIGcode/miscellaneous/verify_grid_generator.html
   ```

### 🎨 BHEM Brand Color System

#### Primary Colors
- 🟠 **Orange** (#F77C3B) - Brand core identity color
- 🔴 **Tomato Red** (#D44C2F) - Emphasis and alert color  
- 🟡 **Light Beige** (#E9E2C5) - Background base color
- 🟨 **Bright Yellow Ochre** (#E6AC40) - Decorative accent color

#### Secondary Colors
- 🟤 **Deep Brown** (#693018) - Stable foundation color
- 🟠 **Vibrant Orange** (#FA9A4C) - Active interaction color
- 🟫 **Warm Yellow Brown** (#DB9242) - Warm transition color
- 🔴 **Deep Brick Red** (#B33B24) - Deep emphasis color

#### Neutral Colors
- ⚪ **Cream White** (#F3ECD5) - Pure supporting color
- ⚫ **Deep Cocoa** (#44200F) - Text contrast color

### 📐 Smart Grid System

- **Adjustable Grid**: 2-20 columns, 2-15 rows, real-time adjustment
- **Force Square**: Ensure uniform grid cell proportions
- **Precise Spacing**: 0-15px precise control
- **Adaptive Canvas**: 400-2000px × 300-1500px
- **Real-time Preview**: Parameter changes take effect instantly
- **Fixed Preview Area**: 600×450 pixel fixed container with smart scaling

### 🖼️ Cultural Icon Integration

- **98 Traditional Symbols**: Complete Adinkra icon library
- **PNG Mask Technology**: Smart icon color conversion
- **Transparency Control**: 20%-100% adjustable
- **Color Customization**: Support for Hex input and color picker
- **Arrangement Options**: Random or sequential options
- **High-Quality Output**: Professional-grade image export

### 🎭 Adinkra Symbol Cultural Significance

#### Core Symbol Introduction

1. **Gye Nyame** (Except God) - Symbolizes God's omnipotence and supremacy
2. **Sankofa** (Go back and take it) - Learn from history, build the future
3. **Adinkrahene** (King of Adinkra) - Authority and leadership
4. **Dwennimmen** (Ram's horns) - Combination of strength and humility
5. **Akoma** (Heart) - Love, patience, and tolerance

#### Cultural Values

- **Historical Heritage**: Each symbol carries the wisdom of the Akan people
- **Moral Education**: Convey values through visual symbols
- **Spiritual Beliefs**: Express reverence for spirits and ancestors
- **Social Order**: Reflect traditional social structures

### 📋 Usage Workflow

1. **Smart Color Scheme** - Use "Smart Color Recommendation" or manually select BHEM brand colors
2. **Set Ordering** - Choose "Sequential Color Order" or "Random Color Order" mode
3. **Adjust Grid** - Set rows and columns, enable "Force Square Cells" (optional)
4. **Configure Icons** - Adjust size, transparency, color, and arrangement
5. **Real-time Preview** - Enable "Real-time Auto Generate" to see instant effects
6. **Export Download** - One-click download of high-quality PNG backgrounds

### 🛠️ Technical Implementation

#### Core Technology Stack

- **HTML5 Canvas**: Graphics rendering and generation
- **JavaScript ES6+**: Interactive logic and data processing
- **CSS3**: Modern UI design and animations
- **PNG Image Processing**: Pixel-level color conversion

#### Key Algorithms

**Color Mask Algorithm**
```javascript
function createColoredIcon(originalImg, color = '#ffffff', opacity = 1) {
    // Parse hex color to RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Apply to icon pixels
    for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] > 0) {
            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;
            data[i + 3] = Math.floor(data[i + 3] * opacity);
        }
    }
    
    return tempCanvas;
}
```

**Grid Layout Algorithm**
```javascript
function calculateGridLayout(canvasWidth, canvasHeight, cols, rows, gap) {
    const cellWidth = (canvasWidth - gap * (cols + 1)) / cols;
    const cellHeight = (canvasHeight - gap * (rows + 1)) / rows;
    return { cellWidth, cellHeight };
}
```

### 📊 Version Comparison

| Feature | v1.0 | v2.0 | v2.1 | Improvement Description |
|---------|------|------|------|-------------------------|
| Color Selection | Click toggle | ✅ Checkmark display | ✅ Checkmark display | Clearer visual feedback |
| Color Ordering | Fixed order | ✅ Sequential/Random | ✅ Sequential/Random | Increased creative possibilities |
| Real-time Preview | Manual generation | ⚡ Instant parameter effect | ⚡ Instant parameter effect | Greatly improved UX |
| Grid Constraints | Independent adjustment | ✅ Force square option | ✅ Force square option | Meet specific design needs |
| Layout Style | Left-right layout | ✅ Top-bottom layout | ✅ Top-bottom layout | Better for modern screen ratios |
| Icon Transparency | Fixed 100% | ✅ 20%-100% adjustable | ✅ 20%-100% adjustable | Enhanced design flexibility |
| Icon Color | Fixed white | Fixed white | ✅ Any color selectable | Support brand color matching |
| Preview Display | Original size | Original size | ✅ Fixed area scaling | Unified visual experience |
| Interface Language | Chinese | Chinese | ✅ English interface | International promotion |
| Startup Experience | Default config | Default config | ✅ Random preview | Instant feature showcase |

### 🎨 Application Scenarios

#### Design Applications
- **Website Backgrounds**: Official website and subpage background design
- **Print Materials**: Posters, brochures, business card backgrounds
- **Display Materials**: Conference presentations, exhibition backgrounds
- **Brand Applications**: Stationery, packaging, merchandise

#### Educational Purposes
- **Cultural Teaching**: Adinkra symbol cultural promotion
- **Design Education**: Color matching and grid design teaching
- **Interactive Experience**: Museum and cultural center interactive displays

### 📊 Technical Parameters

| Parameter | Range | Default | Description |
|-----------|-------|---------|-------------|
| Grid Columns | 2-20 | 8 | Horizontal grid count |
| Grid Rows | 2-15 | 6 | Vertical grid count |
| Grid Gap | 0-15px | 2px | Space between grids |
| Canvas Width | 400-2000px | 800px | Output image width |
| Canvas Height | 300-1500px | 600px | Output image height |
| Icon Size | 30-100% | 70% | Icon size relative to grid |
| Icon Opacity | 20-100% | 100% | Icon transparency control |

### 🔧 Troubleshooting

#### Common Problem Solutions

1. **Icon Loading Failure**
   - Check BHEMicon folder path
   - Confirm icon file integrity
   - Check browser console error messages

2. **Color Display Issues**
   - Verify color code format
   - Check browser color profile settings
   - Reselect color combinations

3. **Download Function Not Working**
   - Confirm browser supports Canvas toDataURL
   - Check popup blocker settings
   - Try different browsers

4. **Performance Issues**
   - Reduce grid count (recommended max 15×12)
   - Lower canvas resolution
   - Close unnecessary browser extensions

### 📁 Project Structure

```
BHEMwebsite/
├── bhem-grid-generator.html              # Main generator v2.1
├── BHEMicon/                             # 98 Adinkra icons
│   ├── *.png                             # PNG format icon files
│   ├── README.md                         # Icon documentation
│   └── 0-adinkra_icons_metadata.json     # Metadata
├── 0-AIGcode/                            # Development and report files
│   ├── miscellaneous/                    # Test and utility scripts
│   └── report/                           # Project report documents
└── README.md                             # This file
```

### 🚀 Development Guide

#### Environment Requirements
- Modern browsers (Chrome 80+, Firefox 75+, Safari 13+)
- Python 3.x (for local server)
- Network connection (for font loading)

#### Extension Development
- Add preset color schemes
- Integrate SVG format export
- Implement batch generation functionality
- Develop mobile touch support

### 🏆 Cultural Value

This tool is not just a technical product, but a carrier of cultural heritage. Through digital means to display and spread Adinkra symbols, we hope to:

- **Preserve Tradition**: Digitally preserve the integrity of cultural symbols
- **Educational Outreach**: Help more people understand African cultural heritage
- **Innovation Integration**: Perfect combination of traditional culture and modern technology
- **Brand Strengthening**: Enhance BHEM brand's cultural foundation

### 📊 Project Status

- ✅ BHEM Grid Background Generator v2.1.0 (Latest version)
- ✅ English Interface Internationalization (Completed)
- ✅ Startup Random Configuration (Completed)
- ✅ Icon Color Customization (Completed)
- ✅ Preview Area Optimization (Completed)
- ✅ Real-time Preview System (Completed)
- ✅ Smart Color Recommendation (Completed)

### 🚀 Future Roadmap

#### Short-term Goals (1 month)
- [ ] Add more preset color schemes
- [ ] Support SVG format export
- [ ] Mobile touch gesture optimization

#### Medium-term Goals (3 months)
- [ ] Icon category filtering functionality
- [ ] Color scheme save and share
- [ ] Advanced blending modes

#### Long-term Vision (6 months)
- [ ] Integration with BHEM official website CMS
- [ ] Community sharing platform
- [ ] Multi-language internationalization support

---

## 📝 Version History

### v2.1.0 (2025-01-27)
- ✅ Icon color customization functionality
- ✅ Preview area fixed-size smart scaling
- ✅ English interface internationalization
- ✅ Startup random configuration preview

### v2.0.0 (2025-01-27)
- ✅ Checkmark selection display system
- ✅ Color ordering options (sequential/random)
- ✅ Real-time preview system
- ✅ Force square functionality
- ✅ Top-bottom layout design
- ✅ Smart color recommendation
- ✅ Icon transparency control

### v1.0.0 (2025-01-27)
- ✅ Complete grid background generation functionality
- ✅ BHEM brand color system integration
- ✅ 98 Adinkra icon support
- ✅ PNG mask color conversion
- ✅ Adjustable grid parameters
- ✅ Export download functionality

---

**Development Team**: AIGcode Team  
**Current Version**: v2.1.0  
**Last Updated**: January 27, 2025  

*Based on respecting traditional culture, we are committed to creating meaningful digital cultural experiences. BHEM Adinkra Grid Background Generator v2.1 - The perfect fusion of tradition and modernity!* 🎨✨ 