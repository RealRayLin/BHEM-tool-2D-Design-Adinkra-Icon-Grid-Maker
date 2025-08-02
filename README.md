# BHEM Icon Wall Generator
*[English](#english) | [Français](#français) | [简体中文](#简体中文)*

---

## English Intro

> **BHEM (Black Heritage Experience Manitoba) Icon Wall Generator** - An interactive tool for creating customizable icon walls with BHEM heritage imagery.

## 📋 Project Overview

The BHEM Icon Wall Generator is a web-based application designed to create dynamic, interactive icon walls showcasing Black heritage in Manitoba. This tool enables users to generate customizable visual displays using a comprehensive collection of heritage icons and imagery.

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- Local web server (Python, Node.js, or similar)

### Installation & Setup

#### Method 1: Python Server
```bash
cd main-code
python3 -m http.server 8080
```
Open http://localhost:8080 in your browser

#### Method 2: Node.js Server
```bash
cd main-code
npx http-server -p 8080
```

#### Method 3: Test Server
```bash
python3 test_server.py
```

## 📁 Project Structure

```
bhem-icon-wall-generator/
├── main-code/                 # Core application files
│   ├── index.html            # Main application page
│   ├── script.js             # Core functionality
│   ├── debug.js              # Development utilities
│   ├── favicon.ico           # Site icon
│   ├── favicon.png           # Site icon (PNG)
│   └── bhem-icon/            # Icon library
│       ├── *.png             # Heritage icon files (100+)
│       └── BHEMicon_metadata.json
├── test_server.py            # Local development server
├── .gitignore               # Git ignore rules
└── README.md                # Project documentation
```

## ✨ Key Features

- **🎨 Icon Wall Generation**: Create custom BHEM heritage icon displays
- **🎯 Smart Color Management**: Intelligent color combination algorithms
- **💾 Settings Import/Export**: Save and load configuration presets
- **📤 Multiple Export Formats**: PNG and SVG output support
- **📱 Responsive Design**: Adaptive to different screen sizes
- **⚙️ Grid Customization**: Optional square cell enforcement
- **🔧 Transparency Control**: Adjustable icon opacity (10%-100%)

## 🎨 Brand Color Palette

### Primary Colors
- **Orange**: `#F77C3B` - Primary brand color
- **Tomato Red**: `#D44C2F` - Accent color
- **Light Beige**: `#E9E2C5` - Background tone
- **Bright Ochre**: `#E6AC40` - Highlight color

### Secondary Colors
- **Deep Brown**: `#693018` - Text and borders
- **Vibrant Orange**: `#FA9A4C` - Interactive elements
- **Warm Brown**: `#DB9242` - Secondary accents
- **Deep Brick Red**: `#B33B24` - Emphasis color

### Neutral Colors
- **Cream White**: `#F3ECD5` - Light backgrounds
- **Deep Cocoa**: `#44200F` - Dark text and elements

## 🛠️ Technical Implementation

### Core Technologies
- **Frontend**: Pure HTML5, CSS3, JavaScript ES6+
- **Graphics**: HTML5 Canvas API for image processing
- **File Operations**: FileReader API for import/export
- **Performance**: Debounced resize handling and incremental updates

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

Requires support for Canvas API, File API, and modern JavaScript features.

## 🔧 Development

### Project History
1. **Foundation**: Basic icon wall generation and color management
2. **Algorithm Enhancement**: Smart color avoidance algorithms
3. **Performance Optimization**: Incremental updates and efficiency improvements
4. **Feature Expansion**: Settings management and transparency controls
5. **Code Refinement**: Production optimization and debug cleanup
6. **Structure Reorganization**: Improved file organization and path corrections

### Technical Highlights
- Canvas-based image manipulation
- Color similarity algorithms
- File import/export functionality
- Responsive grid layouts
- Performance-optimized rendering

## 📄 License

Part of the **BHEM (Black Heritage Experience Manitoba)** project initiative.

---

**🔗 Related Projects**
- [BHEM Website](https://github.com/RealRayLin/BHEM-website) - Main BHEM project website

---

## Français Intro

> **Générateur de Mur d'Icônes BHEM (Black Heritage Experience Manitoba)** - Un outil interactif pour créer des murs d'icônes personnalisables avec des images du patrimoine BHEM.

### 📋 Aperçu du Projet

Le Générateur de Mur d'Icônes BHEM est une application web conçue pour créer des murs d'icônes dynamiques et interactifs mettant en valeur le patrimoine noir au Manitoba. Cet outil permet aux utilisateurs de générer des affichages visuels personnalisables en utilisant une collection complète d'icônes et d'images du patrimoine.

### 🚀 Démarrage Rapide

#### Prérequis
- Navigateur web moderne (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- Serveur web local (Python, Node.js, ou similaire)

#### Installation et Configuration

```bash
cd main-code
python3 -m http.server 8080
```
Ouvrir http://localhost:8080 dans votre navigateur

### ✨ Fonctionnalités Principales

- **🎨 Génération de Mur d'Icônes**: Créer des affichages d'icônes du patrimoine BHEM personnalisés
- **🎯 Gestion Intelligente des Couleurs**: Algorithmes intelligents de combinaison de couleurs
- **💾 Import/Export des Paramètres**: Sauvegarder et charger des préréglages de configuration
- **📤 Formats d'Export Multiples**: Support de sortie PNG et SVG
- **📱 Design Responsive**: Adaptatif aux différentes tailles d'écran
- **🔧 Contrôle de Transparence**: Opacité des icônes ajustable (10%-100%)

### 🎨 Palette de Couleurs de Marque

#### Couleurs Primaires
- **Orange**: `#F77C3B` - Couleur principale de la marque
- **Rouge Tomate**: `#D44C2F` - Couleur d'accent
- **Beige Clair**: `#E9E2C5` - Ton de fond
- **Ocre Brillant**: `#E6AC40` - Couleur de surbrillance

#### Couleurs Secondaires
- **Brun Profond**: `#693018` - Texte et bordures
- **Orange Vibrant**: `#FA9A4C` - Éléments interactifs
- **Brun Chaud**: `#DB9242` - Accents secondaires
- **Rouge Brique Profond**: `#B33B24` - Couleur d'emphase

### 📄 Licence

Partie de l'initiative du projet **BHEM (Black Heritage Experience Manitoba)**.

---

## 简体中文 Intro

> **BHEM（马尼托巴黑人文化遗产）图标墙生成器** - 一个用于创建可定制BHEM文化遗产图像图标墙的交互式工具。

### 📋 项目概述

BHEM图标墙生成器是一个基于Web的应用程序，专为创建动态、交互式图标墙而设计，展示马尼托巴的黑人文化遗产。该工具使用户能够使用全面的文化遗产图标和图像集合生成可定制的视觉显示。

### 🚀 快速开始

#### 系统要求
- 现代浏览器 (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- 本地Web服务器 (Python, Node.js, 或类似工具)

#### 安装与设置

```bash
cd main-code
python3 -m http.server 8080
```
在浏览器中打开 http://localhost:8080

### ✨ 主要功能

- **🎨 图标墙生成**: 创建自定义的BHEM文化遗产图标显示
- **🎯 智能颜色管理**: 智能颜色组合算法
- **💾 设置导入/导出**: 保存和加载配置预设
- **📤 多种导出格式**: PNG和SVG输出支持
- **📱 响应式设计**: 适应不同屏幕尺寸
- **🔧 透明度控制**: 可调节图标不透明度 (10%-100%)

### 🎨 品牌色彩调色板

#### 主色调
- **橙色**: `#F77C3B` - 主品牌色
- **番茄红**: `#D44C2F` - 强调色
- **浅米色**: `#E9E2C5` - 背景色调
- **亮赭石**: `#E6AC40` - 高亮色

#### 次要色调
- **深棕色**: `#693018` - 文本和边框
- **活力橙**: `#FA9A4C` - 交互元素
- **暖棕色**: `#DB9242` - 次要强调色
- **深砖红**: `#B33B24` - 重点色

### 📄 许可证

**BHEM（马尼托巴黑人文化遗产）** 项目计划的一部分。

---

*最后更新: 2025年*