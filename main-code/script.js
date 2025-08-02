class BHEMIconWallGenerator {
    constructor() {
        this.canvas = document.getElementById('iconWall');
        if (!this.canvas) {
            throw new Error('Canvas element with id "iconWall" not found');
        }
        this.ctx = this.canvas.getContext('2d');
        
        // Ensure no default stroke properties
        this.ctx.strokeStyle = 'rgba(0,0,0,0)';
        this.ctx.lineWidth = 0;
        
        // BHEM Brand Colors
        this.colors = {
            primary: [
                { name: 'Orange', hex: '#F77C3B' },
                { name: 'Tomato Red', hex: '#D44C2F' },
                { name: 'Light Beige', hex: '#E9E2C5' },
                { name: 'Bright Ochre', hex: '#E6AC40' }
            ],
            secondary: [
                { name: 'Deep Brown', hex: '#693018' },
                { name: 'Vibrant Orange', hex: '#FA9A4C' },
                { name: 'Warm Yellow Brown', hex: '#DB9242' },
                { name: 'Deep Brick Red', hex: '#B33B24' }
            ],
            neutral: [
                { name: 'Cream White', hex: '#F3ECD5' },
                { name: 'Deep Cocoa', hex: '#44200F' }
            ]
        };

        this.allColors = [...this.colors.primary, ...this.colors.secondary, ...this.colors.neutral];
        
        // Define light and dark color groups for avoid similar colors feature
        this.lightColors = [
            { name: 'Orange', hex: '#F77C3B' },           // Primary
            { name: 'Light Beige', hex: '#E9E2C5' },      // Primary
            { name: 'Bright Ochre', hex: '#E6AC40' },     // Primary  
            { name: 'Vibrant Orange', hex: '#FA9A4C' },   // Secondary
            { name: 'Cream White', hex: '#F3ECD5' }       // Neutral
        ];
        
        this.darkColors = [
            { name: 'Tomato Red', hex: '#D44C2F' },       // Primary
            { name: 'Deep Brown', hex: '#693018' },       // Secondary
            { name: 'Warm Yellow Brown', hex: '#DB9242' }, // Secondary
            { name: 'Deep Brick Red', hex: '#B33B24' },   // Secondary
            { name: 'Deep Cocoa', hex: '#44200F' }        // Neutral
        ];
        
        // Sub-groups to avoid orange-yellow combinations (across light and dark)
        this.orangeColors = [
            { name: 'Orange', hex: '#F77C3B' },           // Light
            { name: 'Vibrant Orange', hex: '#FA9A4C' },   // Light
            { name: 'Warm Yellow Brown', hex: '#DB9242' } // Dark - Actually orange-toned
        ];
        
        this.yellowColors = [
            { name: 'Light Beige', hex: '#E9E2C5' },      // Light
            { name: 'Bright Ochre', hex: '#E6AC40' },     // Light
            { name: 'Cream White', hex: '#F3ECD5' }       // Light
        ];
        
        this.selectedCellColors = [...this.allColors];
        this.selectedIconColors = [...this.allColors];
        this.customIconColors = [];
        this.customCellColors = [];
        
        this.iconImages = new Map();
        this.iconList = [];
        this.currentWall = null;
        this.lockedAspectRatio = null;
        
        this.init();
    }

    async init() {
        await this.loadIcons();
        this.setupUI();
        this.setupEventListeners();
        this.generateWall();
    }

    async loadIcons() {
        // Icon file names based on the directory listing
        const iconNames = [
            'Aban', 'Abe_Dua', 'Abode_Santann', 'Abusua_Pa', 'Adinkrahene', 'Adwo',
            'Agyin_Dawuru', 'Akoben', 'Akofena', 'Akoko_Nan', 'Akoma', 'Akoma_Ntoaso',
            'Ananse_Ntentan', 'Ani_Bere_A_Enso_Gya', 'Anyi_Me_Aye_A', 'Asaawa',
            'Asase_Ye_Duru', 'Asetena_Pa', 'Aya', 'Bese_Saka', 'Bi_Nka_Bi',
            'Boa_Me_Na_Me_Mmoa_Wo', 'Boafo_Ye_Na', 'Dame_Dame', 'Denkyem', 'Dono',
            'Dono_Ntoaso', 'Duafe', 'Dwantire', 'Dwennimmen', 'Eban', 'Epa',
            'Ese_ne_Tekrema', 'Esono_Anantam', 'Fafanto', 'Fawohodie', 'Fihankra',
            'Fofo', 'Funtumfunefu_Denkyemfunefu', 'Gyawu_Atiko', 'Gye_Nyame',
            'Hwehwemudua', 'Hye_Wo_Nhye', 'Kete_Pa', 'Kintinkantan', 'Kokuromotie',
            'Kra', 'Kramo_Bone_Amma_Yeanhu_Kramo_Pa', 'Krapa', 'Kuronti_ne_Akwamu',
            'Kwatakye_Atiko', 'Kyemfere', 'Mako', 'Mate_Masie', 'Mekyea_Wo',
            'Menso_Wo_Kenten', 'Mframadan', 'Mmeramubere', 'Mmeramutene', 'Mmere_Dane',
            'Mpatapo', 'Mpuannum', 'Nea_Onnim', 'Nea_Ope_Se_Obedi_Hene',
            'Nkonsonkonson', 'Nkotimsefo_Mpua', 'Nkrabea', 'Nkyemu', 'Nkyinkyim',
            'Nnamfo_Pa_Baanu', 'Nsaa', 'Nserewa', 'Nsoromma', 'Nteasee',
            'Nyame_Baatanpa', 'Nyame_Biribi_Wo_Soro', 'Nyame_Dua', 'Nyame_Nti',
            'Nyame_Nwu_Na_Mawu', 'Nyansapo', 'Obohemaa', 'Odo_Nnyew_Fie_Kwan',
            'Ohene_Aniwa', 'Okodee_Mmowere', 'Okuafo_Pa', 'Osram_ne_Nsoromma',
            'Owo_Foro_Adobe', 'Owuo_Atwedee', 'Pempamsie', 'Sankofa', 'Sepow',
            'Sesa_Wo_Suban', 'Som_Onyankopon', 'Sunsum', 'Tabono', 'Tamfo_Bebre',
            'Tumi_Te_Se_Kosua', 'Wawa_Aba'
        ];

        this.iconList = iconNames;
        
        // Pre-load a few icons for immediate display
        const preloadIcons = iconNames.slice(0, 10);
        for (const iconName of preloadIcons) {
            try {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                    img.src = `./bhem-icon/${iconName}.png`;
                });
                this.iconImages.set(iconName, img);
            } catch (error) {
                console.warn(`Failed to load icon: ${iconName}`, error);
            }
        }
    }

    setupUI() {
        // Populate color lists
        this.populateColorList('cellColorList', this.selectedCellColors, (colors) => {
            this.selectedCellColors = colors;
            this.updateCellColors();
        });

        this.populateColorList('iconColorList', this.selectedIconColors, (colors) => {
            this.selectedIconColors = colors;
            this.updateIconColors();
        });

        // Update icon scale display
        const iconScale = document.getElementById('iconScale');
        const iconScaleValue = document.getElementById('iconScaleValue');
        iconScaleValue.textContent = iconScale.value + '%';
        
        // Update icon opacity display
        const iconOpacity = document.getElementById('iconOpacity');
        const iconOpacityValue = document.getElementById('iconOpacityValue');
        iconOpacityValue.textContent = iconOpacity.value + '%';
    }

    populateColorList(containerId, selectedColors, onChange) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';

        const groups = [
            { name: 'Primary Colors', colors: this.colors.primary },
            { name: 'Secondary Colors', colors: this.colors.secondary },
            { name: 'Neutral Colors', colors: this.colors.neutral }
        ];

        // Add custom colors group if there are any
        if (this.customIconColors.length > 0 && containerId === 'iconColorList') {
            groups.push({ name: 'Custom Colors', colors: this.customIconColors });
        }
        if (this.customCellColors.length > 0 && containerId === 'cellColorList') {
            groups.push({ name: 'Custom Colors', colors: this.customCellColors });
        }

        groups.forEach(group => {
            const groupDiv = document.createElement('div');
            groupDiv.style.marginBottom = '10px';
            
            const groupLabel = document.createElement('div');
            groupLabel.textContent = group.name;
            groupLabel.style.fontSize = '12px';
            groupLabel.style.color = '#E6AC40';
            groupLabel.style.marginBottom = '5px';
            groupDiv.appendChild(groupLabel);

            group.colors.forEach(color => {
                const colorItem = document.createElement('div');
                colorItem.className = 'checkbox-group';
                colorItem.style.fontSize = '12px';

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = selectedColors.some(c => c.hex === color.hex);
                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) {
                        if (!selectedColors.some(c => c.hex === color.hex)) {
                            selectedColors.push(color);
                        }
                    } else {
                        const index = selectedColors.findIndex(c => c.hex === color.hex);
                        if (index > -1) {
                            selectedColors.splice(index, 1);
                        }
                    }
                    onChange(selectedColors);
                });

                const preview = document.createElement('span');
                preview.className = 'color-preview';
                preview.style.backgroundColor = color.hex;

                const label = document.createElement('label');
                label.textContent = color.name;
                label.style.fontSize = '11px';

                colorItem.appendChild(checkbox);
                colorItem.appendChild(preview);
                colorItem.appendChild(label);

                // Add delete button for custom colors
                if (color.isCustom) {
                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = '×';
                    deleteBtn.style.marginLeft = '5px';
                    deleteBtn.style.background = '#B33B24';
                    deleteBtn.style.color = 'white';
                    deleteBtn.style.border = 'none';
                    deleteBtn.style.borderRadius = '3px';
                    deleteBtn.style.padding = '2px 6px';
                    deleteBtn.style.fontSize = '10px';
                    deleteBtn.style.cursor = 'pointer';
                    deleteBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        // Remove from both arrays
                        if (containerId === 'iconColorList') {
                            const customIndex = this.customIconColors.findIndex(c => c.hex === color.hex);
                            if (customIndex > -1) this.customIconColors.splice(customIndex, 1);
                        } else if (containerId === 'cellColorList') {
                            const customIndex = this.customCellColors.findIndex(c => c.hex === color.hex);
                            if (customIndex > -1) this.customCellColors.splice(customIndex, 1);
                        }
                        
                        const selectedIndex = selectedColors.findIndex(c => c.hex === color.hex);
                        if (selectedIndex > -1) selectedColors.splice(selectedIndex, 1);
                        
                        onChange(selectedColors);
                        this.populateColorList(containerId, selectedColors, onChange);
                    });
                    colorItem.appendChild(deleteBtn);
                }

                groupDiv.appendChild(colorItem);
            });

            container.appendChild(groupDiv);
        });
    }

    setupEventListeners() {
        // Panel toggle
        document.getElementById('panelToggle').addEventListener('click', () => {
            const panel = document.getElementById('settingsPanel');
            const toggle = document.getElementById('panelToggle');
            
            if (panel.classList.contains('collapsed')) {
                panel.classList.remove('collapsed');
                toggle.textContent = '◀';
            } else {
                panel.classList.add('collapsed');
                toggle.textContent = '▶';
            }
        });

        // Dimension inputs with debounce
        ['wallWidth', 'wallHeight', 'outputWidth', 'outputHeight'].forEach(id => {
            let timeout;
            document.getElementById(id).addEventListener('input', () => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    if (id === 'outputWidth' && document.getElementById('maintainAspectRatio').checked) {
                        this.updateAspectRatio('width');
                    } else if (id === 'outputHeight' && document.getElementById('maintainAspectRatio').checked) {
                        this.updateAspectRatio('height');
                    }
                    
                    // Handle force square cells logic
                    if (id === 'wallHeight' && document.getElementById('forceSquare').checked) {
                        this.adjustColumnsForSquare();
                    }
                    
                    // Only regenerate wall if grid dimensions changed, not just output resolution
                    if (id === 'wallWidth' || id === 'wallHeight' || 
                        (id === 'wallHeight' && document.getElementById('forceSquare').checked)) {
                        this.generateWall();
                    } else if (id === 'outputWidth' || id === 'outputHeight') {
                        // For output resolution changes, update the wall settings and canvas
                        this.updateOutputResolution();
                    }
                }, 300); // 300ms debounce
            });
        });

        // Icon scale with debounce
        let iconScaleTimeout;
        document.getElementById('iconScale').addEventListener('input', (e) => {
            document.getElementById('iconScaleValue').textContent = e.target.value + '%';
            clearTimeout(iconScaleTimeout);
            iconScaleTimeout = setTimeout(() => {
                this.updateIconScale();
            }, 100);
        });
        
        // Icon opacity with debounce
        let iconOpacityTimeout;
        document.getElementById('iconOpacity').addEventListener('input', (e) => {
            document.getElementById('iconOpacityValue').textContent = e.target.value + '%';
            clearTimeout(iconOpacityTimeout);
            iconOpacityTimeout = setTimeout(() => {
                this.updateIconOpacity();
            }, 100);
        });

        // Checkboxes with specific update methods
        const checkboxHandlers = {
            'randomCellColors': () => this.updateCellColors(),
            'showCellBackground': () => {
                this.toggleUniformBackground();
                this.updateCellColors();
            },
            'randomWithCustomCellColors': () => {
                const checkbox = document.getElementById('randomWithCustomCellColors');
                if (checkbox.checked && this.customCellColors.length === 0) {
                    console.warn('No custom cell colors available, unchecking...');
                    checkbox.checked = false;
                    return;
                }
                this.updateCellColors();
            },
            'randomIconColors': () => this.updateIconColors(),
            'showIcons': () => this.updateIconColors(),
            'avoidSimilarColors': () => this.updateIconColors(),
            'randomWithCustomColors': () => {
                const checkbox = document.getElementById('randomWithCustomColors');
                if (checkbox.checked && this.customIconColors.length === 0) {
                    console.warn('No custom icon colors available, unchecking...');
                    checkbox.checked = false;
                    return;
                }
                this.updateIconColors();
            },
            'showBorder': () => this.updateBorders(),
            'forceSquare': () => {
                if (document.getElementById('forceSquare').checked) {
                    this.adjustColumnsForSquare();
                }
                this.generateWall(); // This needs full regeneration
            },
            'maintainAspectRatio': () => {
                const isChecked = document.getElementById('maintainAspectRatio').checked;
                if (isChecked) {
                    // Lock the current aspect ratio
                    const outputWidth = parseInt(document.getElementById('outputWidth').value) || 1920;
                    const outputHeight = parseInt(document.getElementById('outputHeight').value) || 1080;
                    this.lockedAspectRatio = outputWidth / outputHeight;
                } else {
                    // Unlock aspect ratio
                    this.lockedAspectRatio = null;
                }
                // Recalculate preview dimensions
                this.updatePreviewDimensions();
            }
        };

        Object.keys(checkboxHandlers).forEach(id => {
            document.getElementById(id).addEventListener('change', checkboxHandlers[id]);
        });

        // Border settings and uniform background with incremental updates
        ['borderColor', 'borderWidth'].forEach(id => {
            const element = document.getElementById(id);
            
            // Remove any existing listeners
            element.removeEventListener('input', this._borderListeners?.[id]);
            
            const listener = () => {
                this.updateBorders();
            };
            
            // Store listener reference for cleanup
            this._borderListeners = this._borderListeners || {};
            this._borderListeners[id] = listener;
            
            element.addEventListener('input', listener);
        });
        
        // Uniform background color with immediate update
        document.getElementById('uniformBackgroundColor').addEventListener('input', () => {
            this.updateBackground();
        });

        // Buttons
        document.getElementById('generateWall').addEventListener('click', () => {
            this.generateWall();
        });

        document.getElementById('randomizeAll').addEventListener('click', () => {
            this.randomizeAll();
        });

        document.getElementById('exportPNG').addEventListener('click', () => {
            this.exportPNG();
        });

        document.getElementById('exportSVG').addEventListener('click', () => {
            this.exportSVG();
        });

        document.getElementById('exportSettings').addEventListener('click', () => {
            this.exportSettings();
        });

        document.getElementById('importSettings').addEventListener('click', () => {
            document.getElementById('settingsFileInput').click();
        });

        document.getElementById('settingsFileInput').addEventListener('change', (e) => {
            this.importSettings(e);
        });

        // Custom icon colors
        document.getElementById('addCustomIconColors').addEventListener('click', () => {
            this.addCustomIconColors();
        });

        // Support Enter key for custom colors input
        const customIconInput = document.getElementById('customIconColors');
        customIconInput.addEventListener('input', (e) => {
        });
        customIconInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.addCustomIconColors();
            }
        });

        // Custom cell colors
        document.getElementById('addCustomCellColors').addEventListener('click', () => {
            this.addCustomCellColors();
        });

        // Support Enter key for custom cell colors input
        document.getElementById('customCellColors').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.addCustomCellColors();
            }
        });

        // Color selection buttons
        document.getElementById('randomCellColorsBtn').addEventListener('click', () => {
            this.randomizeColorSelection('cell');
        });

        document.getElementById('selectAllCellColors').addEventListener('click', () => {
            this.selectAllColors('cell');
        });

        document.getElementById('deselectAllCellColors').addEventListener('click', () => {
            this.deselectAllColors('cell');
        });

        document.getElementById('randomIconColorsBtn').addEventListener('click', () => {
            this.randomizeColorSelection('icon');
        });

        document.getElementById('selectAllIconColors').addEventListener('click', () => {
            this.selectAllColors('icon');
        });

        document.getElementById('deselectAllIconColors').addEventListener('click', () => {
            this.deselectAllColors('icon');
        });

        // Window resize with debouncing
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.updateCanvasSize();
            }, 150); // 150ms debounce
        });

        // Initialize uniform background visibility
        this.toggleUniformBackground();
    }

    toggleUniformBackground() {
        const showCellBackground = document.getElementById('showCellBackground').checked;
        const uniformSection = document.getElementById('uniformBackgroundSection');
        uniformSection.style.display = showCellBackground ? 'none' : 'block';
    }

    addCustomIconColors() {
        const input = document.getElementById('customIconColors');
        const colorString = input.value.trim();
        
        if (!colorString) return;

        // Parse comma-separated hex colors
        const hexPattern = /#[0-9A-Fa-f]{6}/g;
        const colors = colorString.match(hexPattern);
        
        if (!colors || colors.length === 0) {
            alert('Please enter valid hex colors (e.g., #FF0000, #00FF00, #0000FF)');
            return;
        }

        // Add custom colors
        colors.forEach((hex, index) => {
            const customColor = {
                name: `Custom ${this.customIconColors.length + index + 1}`,
                hex: hex.toUpperCase(),
                isCustom: true
            };
            
            // Check if color already exists
            const exists = this.selectedIconColors.some(c => c.hex === customColor.hex);
            if (!exists) {
                this.customIconColors.push(customColor);
                this.selectedIconColors.push(customColor);
            }
        });

        // Clear input and refresh UI
        input.value = '';
        this.populateColorList('iconColorList', this.selectedIconColors, (colors) => {
            this.selectedIconColors = colors;
            this.updateIconColors();
        });
        
        this.updateIconColors();
    }

    randomizeColorSelection(type) {
        const customColors = type === 'icon' ? this.customIconColors : this.customCellColors;
        const totalColors = this.allColors.length + customColors.length;
        const selectedCount = Math.floor(Math.random() * totalColors) + 1;
        const allAvailableColors = [...this.allColors, ...customColors];
        
        // Randomly select colors
        const randomColors = [];
        const usedIndices = new Set();
        
        while (randomColors.length < selectedCount && usedIndices.size < allAvailableColors.length) {
            const randomIndex = Math.floor(Math.random() * allAvailableColors.length);
            if (!usedIndices.has(randomIndex)) {
                usedIndices.add(randomIndex);
                randomColors.push(allAvailableColors[randomIndex]);
            }
        }

        if (type === 'cell') {
            this.selectedCellColors = randomColors;
            // Auto check show cell backgrounds
            document.getElementById('showCellBackground').checked = true;
            this.toggleUniformBackground();
            this.populateColorList('cellColorList', this.selectedCellColors, (colors) => {
                this.selectedCellColors = colors;
                this.updateCellColors();
            });
            // Update cell colors immediately 
            this.updateCellColors();
        } else {
            this.selectedIconColors = randomColors;
            this.populateColorList('iconColorList', this.selectedIconColors, (colors) => {
                this.selectedIconColors = colors;
                this.updateIconColors();
            });
            // Update icon colors immediately
            this.updateIconColors();
        }
    }

    selectAllColors(type) {
        if (type === 'cell') {
            this.selectedCellColors = [...this.allColors, ...this.customCellColors];
            // Auto check show cell backgrounds
            document.getElementById('showCellBackground').checked = true;
            this.toggleUniformBackground();
            this.populateColorList('cellColorList', this.selectedCellColors, (colors) => {
                this.selectedCellColors = colors;
                this.updateCellColors();
            });
        } else {
            this.selectedIconColors = [...this.allColors, ...this.customIconColors];
            this.populateColorList('iconColorList', this.selectedIconColors, (colors) => {
                this.selectedIconColors = colors;
                this.updateIconColors();
            });
        }
        
        this.updateIconColors();
    }

    deselectAllColors(type) {
        if (type === 'cell') {
            this.selectedCellColors = [];
            // Auto uncheck show cell backgrounds when no colors selected
            document.getElementById('showCellBackground').checked = false;
            this.toggleUniformBackground();
            this.populateColorList('cellColorList', this.selectedCellColors, (colors) => {
                this.selectedCellColors = colors;
                this.updateCellColors();
            });
        } else {
            this.selectedIconColors = [];
            this.populateColorList('iconColorList', this.selectedIconColors, (colors) => {
                this.selectedIconColors = colors;
                this.updateIconColors();
            });
        }
        
        this.updateIconColors();
    }

    addCustomCellColors() {
        const input = document.getElementById('customCellColors');
        const colorString = input.value.trim();
        
        if (!colorString) return;

        // Parse comma-separated hex colors
        const hexPattern = /#[0-9A-Fa-f]{6}/g;
        const colors = colorString.match(hexPattern);
        
        if (!colors || colors.length === 0) {
            alert('Please enter valid hex colors (e.g., #FF0000, #00FF00, #0000FF)');
            return;
        }

        // Add custom colors
        colors.forEach((hex, index) => {
            const customColor = {
                name: `Custom ${this.customCellColors.length + index + 1}`,
                hex: hex.toUpperCase(),
                isCustom: true
            };
            
            // Check if color already exists
            const exists = this.selectedCellColors.some(c => c.hex === customColor.hex);
            if (!exists) {
                this.customCellColors.push(customColor);
                this.selectedCellColors.push(customColor);
            }
        });

        // Clear input and refresh UI
        input.value = '';
        this.populateColorList('cellColorList', this.selectedCellColors, (colors) => {
            this.selectedCellColors = colors;
            this.updateCellColors();
        });
        
        this.updateIconColors();
    }

    // Calculate color contrast using WCAG formula
    getColorContrast(color1, color2) {
        const rgb1 = this.hexToRgb(color1);
        const rgb2 = this.hexToRgb(color2);
        
        const getLuminance = (rgb) => {
            const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
                c = c / 255;
                return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
            });
            return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        };

        const lum1 = getLuminance(rgb1);
        const lum2 = getLuminance(rgb2);
        
        const brightest = Math.max(lum1, lum2);
        const darkest = Math.min(lum1, lum2);
        
        return (brightest + 0.05) / (darkest + 0.05);
    }

    // Check if two colors are too similar using multiple methods
    areColorsSimilar(color1, color2, threshold = 6.0) {
        // First check: exact same color
        if (color1.toUpperCase() === color2.toUpperCase()) {
            return true;
        }
        
        // Method 1: WCAG contrast ratio
        const contrastRatio = this.getColorContrast(color1, color2);
        
        // Method 2: Euclidean distance in RGB space
        const rgb1 = this.hexToRgb(color1);
        const rgb2 = this.hexToRgb(color2);
        const rgbDistance = Math.sqrt(
            Math.pow(rgb1.r - rgb2.r, 2) + 
            Math.pow(rgb1.g - rgb2.g, 2) + 
            Math.pow(rgb1.b - rgb2.b, 2)
        );
        
        // Method 3: HSV distance for better perceptual similarity
        const hsv1 = this.rgbToHsv(rgb1);
        const hsv2 = this.rgbToHsv(rgb2);
        const hsvDistance = Math.sqrt(
            Math.pow(hsv1.h - hsv2.h, 2) + 
            Math.pow(hsv1.s - hsv2.s, 2) * 0.5 + 
            Math.pow(hsv1.v - hsv2.v, 2) * 0.5
        );
        
        // More strict similarity detection - increased threshold and distances
        const isSimilar = contrastRatio < threshold || rgbDistance < 120 || hsvDistance < 80;
        if (isSimilar) {
            console.log('Colors are similar:', {
                contrastRatio: contrastRatio.toFixed(2),
                rgbDistance: rgbDistance.toFixed(2),
                hsvDistance: hsvDistance.toFixed(2),
                reason: contrastRatio < threshold ? 'low contrast' : rgbDistance < 120 ? 'close RGB' : 'close HSV'
            });
        }
        
        // Colors are similar if:
        // - Low contrast ratio OR
        // - Small RGB distance OR 
        // - Small HSV distance
        return isSimilar;
    }
    
    // Convert RGB to HSV for better perceptual color comparison
    rgbToHsv(rgb) {
        const r = rgb.r / 255;
        const g = rgb.g / 255;
        const b = rgb.b / 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const diff = max - min;
        
        let h = 0;
        if (diff !== 0) {
            switch (max) {
                case r: h = ((g - b) / diff + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / diff + 2) / 6; break;
                case b: h = ((r - g) / diff + 4) / 6; break;
            }
        }
        
        const s = max === 0 ? 0 : diff / max;
        const v = max;
        
        return { 
            h: h * 360, // Hue in degrees
            s: s * 100, // Saturation in percent
            v: v * 100  // Value in percent
        };
    }

    // Get a contrasting color from available options
    getContrastingColor(baseColor, availableColors, usedColors = []) {
        const avoidSimilar = document.getElementById('avoidSimilarColors').checked;
        
        
        // ALWAYS filter out identical colors regardless of avoidSimilar setting
        const nonIdenticalColors = availableColors.filter(color => 
            color.hex.toUpperCase() !== baseColor.toUpperCase()
        );
        
        if (nonIdenticalColors.length === 0) {
            console.warn(`⚠️ No non-identical colors available for ${baseColor}`);
            return availableColors[0]; // fallback
        }
        
        if (!avoidSimilar) {
            const randomColor = nonIdenticalColors[Math.floor(Math.random() * nonIdenticalColors.length)];
            return randomColor;
        }
        
        // Continue with similarity avoidance using non-identical colors
        availableColors = nonIdenticalColors;

        // Determine if base color is light or dark
        const isBaseLightColor = this.lightColors.some(color => color.hex.toUpperCase() === baseColor.toUpperCase());
        const isBaseDarkColor = this.darkColors.some(color => color.hex.toUpperCase() === baseColor.toUpperCase());
        
        if (!isBaseLightColor && !isBaseDarkColor) {
            // Base color is not in our default colors (probably custom)
            const customColorType = this.getCustomColorType(baseColor);
            
            // For custom colors, apply both basic similarity check AND orange-yellow avoidance
            const suitableColors = availableColors.filter(color => {
                const isSameColor = color.hex.toUpperCase() === baseColor.toUpperCase();
                const isSimilarHex = this.areHexColorsSimilar(baseColor, color.hex);
                
                // Check if target color is also custom and has conflicting type
                const targetIsDefaultLight = this.lightColors.some(c => c.hex.toUpperCase() === color.hex.toUpperCase());
                const targetIsDefaultDark = this.darkColors.some(c => c.hex.toUpperCase() === color.hex.toUpperCase());
                
                let hasColorTypeConflict = false;
                if (!targetIsDefaultLight && !targetIsDefaultDark) {
                    // Target is also custom, check for type conflicts
                    const targetCustomType = this.getCustomColorType(color.hex);
                    hasColorTypeConflict = (customColorType === 'orange' && targetCustomType === 'yellow') ||
                                          (customColorType === 'yellow' && targetCustomType === 'orange') ||
                                          (customColorType === 'orange' && targetCustomType === 'orange') ||
                                          (customColorType === 'yellow' && targetCustomType === 'yellow');
                    
                    if (hasColorTypeConflict) {
                    }
                } else {
                    // Target is default color, check against our defined groups
                    if (customColorType === 'orange') {
                        hasColorTypeConflict = this.yellowColors.some(y => y.hex.toUpperCase() === color.hex.toUpperCase()) ||
                                             this.orangeColors.some(o => o.hex.toUpperCase() === color.hex.toUpperCase());
                    } else if (customColorType === 'yellow') {
                        hasColorTypeConflict = this.orangeColors.some(o => o.hex.toUpperCase() === color.hex.toUpperCase()) ||
                                             this.yellowColors.some(y => y.hex.toUpperCase() === color.hex.toUpperCase());
                    }
                }
                
                return !isSameColor && !isSimilarHex && !hasColorTypeConflict;
            });
            
            if (suitableColors.length > 0) {
                const randomColor = suitableColors[Math.floor(Math.random() * suitableColors.length)];
                return randomColor;
            } else {
                // Fallback: just avoid identical colors
                const nonIdenticalColors = availableColors.filter(color => 
                    color.hex.toUpperCase() !== baseColor.toUpperCase()
                );
                if (nonIdenticalColors.length > 0) {
                    const fallbackColor = nonIdenticalColors[Math.floor(Math.random() * nonIdenticalColors.length)];
                    return fallbackColor;
                } else {
                    const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
                    return randomColor;
                }
            }
        }

        // Determine if base color is orange or yellow (across light/dark groups)
        const isBaseOrange = this.orangeColors.some(color => color.hex.toUpperCase() === baseColor.toUpperCase());
        const isBaseYellow = this.yellowColors.some(color => color.hex.toUpperCase() === baseColor.toUpperCase());

        // Choose from the opposite group, but with orange-yellow avoidance rules
        let targetGroup;
        if (isBaseLightColor) {
            // Base is light, choose from dark colors
            targetGroup = this.darkColors;
            
            // Apply orange-yellow avoidance in dark colors too
            if (isBaseOrange) {
                // Base is orange, avoid yellow colors AND other orange colors in target group
                targetGroup = this.darkColors.filter(color => 
                    !this.yellowColors.some(yellowColor => yellowColor.hex.toUpperCase() === color.hex.toUpperCase()) &&
                    !this.orangeColors.some(orangeColor => orangeColor.hex.toUpperCase() === color.hex.toUpperCase())
                );
            } else if (isBaseYellow) {
                // Base is yellow, avoid orange colors AND other yellow colors in target group
                targetGroup = this.darkColors.filter(color => 
                    !this.orangeColors.some(orangeColor => orangeColor.hex.toUpperCase() === color.hex.toUpperCase()) &&
                    !this.yellowColors.some(yellowColor => yellowColor.hex.toUpperCase() === color.hex.toUpperCase())
                );
            }
        } else {
            // Base is dark, choose from light colors
            targetGroup = this.lightColors;
            
            // Apply orange-yellow avoidance in light colors
            if (isBaseOrange) {
                // Base is orange, avoid yellow colors AND other orange colors in target group
                targetGroup = this.lightColors.filter(color => 
                    !this.yellowColors.some(yellowColor => yellowColor.hex.toUpperCase() === color.hex.toUpperCase()) &&
                    !this.orangeColors.some(orangeColor => orangeColor.hex.toUpperCase() === color.hex.toUpperCase())
                );
            } else if (isBaseYellow) {
                // Base is yellow, avoid orange colors AND other yellow colors in target group
                targetGroup = this.lightColors.filter(color => 
                    !this.orangeColors.some(orangeColor => orangeColor.hex.toUpperCase() === color.hex.toUpperCase()) &&
                    !this.yellowColors.some(yellowColor => yellowColor.hex.toUpperCase() === color.hex.toUpperCase())
                );
            }
        }

        // Filter target group colors that are available in the selected colors
        const availableTargetColors = targetGroup.filter(targetColor => 
            availableColors.some(availableColor => availableColor.hex.toUpperCase() === targetColor.hex.toUpperCase())
        );

        // Also filter out recently used colors
        const finalTargetColors = availableTargetColors.filter(color => 
            !usedColors.includes(color.hex)
        );

        if (finalTargetColors.length > 0) {
            const selectedColor = finalTargetColors[Math.floor(Math.random() * finalTargetColors.length)];
            return selectedColor;
        }

        // Fallback: if no colors from opposite group available, try without recent filter
        if (availableTargetColors.length > 0) {
            const fallbackColor = availableTargetColors[Math.floor(Math.random() * availableTargetColors.length)];
            return fallbackColor;
        }

        // Final fallback: any available color
        const lastResort = availableColors[Math.floor(Math.random() * availableColors.length)];
        console.warn(`⚠️ No opposite group colors available, using random: ${lastResort.hex}`);
        return lastResort;
    }
    
    // Simple hex color similarity check for custom colors
    areHexColorsSimilar(color1, color2, threshold = 80) {
        const rgb1 = this.hexToRgb(color1);
        const rgb2 = this.hexToRgb(color2);
        
        // Calculate Euclidean distance in RGB space
        const distance = Math.sqrt(
            Math.pow(rgb1.r - rgb2.r, 2) + 
            Math.pow(rgb1.g - rgb2.g, 2) + 
            Math.pow(rgb1.b - rgb2.b, 2)
        );
        
        const isSimilar = distance < threshold;
        if (isSimilar) {
        }
        
        return isSimilar;
    }
    
    // Determine if a custom color is orange-like or yellow-like based on HSV
    getCustomColorType(hexColor) {
        const rgb = this.hexToRgb(hexColor);
        const hsv = this.rgbToHsv(rgb);
        const hue = hsv.h;
        const saturation = hsv.s;
        
        // Only classify if saturation is high enough (not too gray)
        if (saturation < 0.3) {
            return 'neutral';
        }
        
        // Orange hues: roughly 15-45 degrees
        if (hue >= 15 && hue <= 45) {
            return 'orange';
        }
        
        // Yellow hues: roughly 45-75 degrees  
        if (hue >= 45 && hue <= 75) {
            return 'yellow';
        }
        
        return 'other';
    }

    adjustColumnsForSquare() {
        const outputWidth = parseInt(document.getElementById('outputWidth').value) || 1920;
        const outputHeight = parseInt(document.getElementById('outputHeight').value) || 1080;
        const rows = parseInt(document.getElementById('wallHeight').value) || 8;
        
        // Calculate columns based on output resolution to maintain square cells
        const cellSize = outputHeight / rows;
        const columns = Math.floor(outputWidth / cellSize);
        
        document.getElementById('wallWidth').value = columns;
    }

    updateAspectRatio(changedDimension) {
        if (!this.lockedAspectRatio) return;
        
        if (changedDimension === 'width') {
            const newWidth = parseInt(document.getElementById('outputWidth').value) || 1920;
            const newHeight = Math.round(newWidth / this.lockedAspectRatio);
            document.getElementById('outputHeight').value = newHeight;
        } else {
            const newHeight = parseInt(document.getElementById('outputHeight').value) || 1080;
            const newWidth = Math.round(newHeight * this.lockedAspectRatio);
            document.getElementById('outputWidth').value = newWidth;
        }
    }

    generateWall() {
        const width = parseInt(document.getElementById('wallWidth').value) || 10;
        const height = parseInt(document.getElementById('wallHeight').value) || 8;
        const outputWidth = parseInt(document.getElementById('outputWidth').value) || 1920;
        const outputHeight = parseInt(document.getElementById('outputHeight').value) || 1080;
        const forceSquare = document.getElementById('forceSquare').checked;
        const randomCellColors = document.getElementById('randomCellColors').checked;
        const randomIconColors = document.getElementById('randomIconColors').checked;
        const iconScale = parseInt(document.getElementById('iconScale').value) || 70;
        const iconOpacity = parseInt(document.getElementById('iconOpacity').value) || 100;
        const showBorder = document.getElementById('showBorder').checked;
        const borderColor = document.getElementById('borderColor').value;
        const borderWidth = parseInt(document.getElementById('borderWidth').value) || 0;
        const showCellBackground = document.getElementById('showCellBackground').checked;
        const showIcons = document.getElementById('showIcons').checked;
        const uniformBackgroundColor = document.getElementById('uniformBackgroundColor').value;

        if (this.selectedCellColors.length === 0 || this.selectedIconColors.length === 0) {
            console.warn('No colors selected');
            return;
        }

        // Calculate preview size based on Output Resolution aspect ratio
        const outputAspectRatio = outputWidth / outputHeight;
        const maxCanvasWidth = window.innerWidth - 340; // Account for panel
        const maxCanvasHeight = window.innerHeight - 40;
        
        let previewWidth, previewHeight;
        
        // Scale to fit viewport while maintaining output resolution aspect ratio
        if (maxCanvasWidth / maxCanvasHeight > outputAspectRatio) {
            // Height is the limiting factor
            previewHeight = maxCanvasHeight;
            previewWidth = previewHeight * outputAspectRatio;
        } else {
            // Width is the limiting factor
            previewWidth = maxCanvasWidth;
            previewHeight = previewWidth / outputAspectRatio;
        }
        
        // Calculate cell sizes for preview
        let cellWidth, cellHeight, actualWidth = width;
        if (forceSquare) {
            // For square cells, calculate based on output resolution
            const outputCellSize = outputHeight / height; // Use height as reference
            const previewScale = previewHeight / outputHeight;
            cellWidth = cellHeight = outputCellSize * previewScale;
            
            // Calculate how many cells can fit in the preview width
            const maxCellsInWidth = Math.floor(previewWidth / cellWidth);
            
            // If we can fit more cells, expand the grid to fill the width
            if (maxCellsInWidth > width) {
                actualWidth = maxCellsInWidth;
                // Center the original grid within the expanded grid
                this.previewXOffset = 0;
                this.originalGridStartCol = Math.floor((actualWidth - width) / 2);
            } else {
                // Original behavior: center the grid
                const gridWidth = width * cellWidth;
                const xOffset = (previewWidth - gridWidth) / 2;
                this.previewXOffset = xOffset;
                this.originalGridStartCol = 0;
            }
        } else {
            cellWidth = previewWidth / width;
            cellHeight = previewHeight / height;
            this.previewXOffset = 0;
            this.originalGridStartCol = 0;
        }

        const canvasWidth = previewWidth;
        const canvasHeight = previewHeight;

        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.canvas.style.width = canvasWidth + 'px';
        this.canvas.style.height = canvasHeight + 'px';
        
        // Reset canvas context defaults
        this.ctx.strokeStyle = 'transparent';
        this.ctx.lineWidth = 0;
        this.ctx.fillStyle = 'transparent';

        // Generate wall data
        this.currentWall = {
            width,
            height,
            cellWidth,
            cellHeight,
            outputWidth,
            outputHeight,
            showBorder,
            borderColor,
            borderWidth,
            showCellBackground,
            showIcons,
            uniformBackgroundColor,
            cells: []
        };

        // Keep track of recently used colors for better distribution
        const recentCellColors = [];
        const recentIconColors = [];
        const maxRecentColors = Math.min(5, Math.max(this.selectedCellColors.length, this.selectedIconColors.length));

        for (let row = 0; row < height; row++) {
            for (let col = 0; col < actualWidth; col++) {
                let cellColor, iconColor;

                if (randomCellColors) {
                    // Check if should use custom colors only
                    const randomWithCustomCell = document.getElementById('randomWithCustomCellColors').checked;
                    const availableCellColors = randomWithCustomCell && this.customCellColors.length > 0 
                        ? this.customCellColors 
                        : this.selectedCellColors;
                    
                    cellColor = availableCellColors[Math.floor(Math.random() * availableCellColors.length)];
                } else {
                    cellColor = this.selectedCellColors[((row * actualWidth) + col) % this.selectedCellColors.length];
                }

                if (randomIconColors) {
                    // Check if should use custom colors only
                    const randomWithCustom = document.getElementById('randomWithCustomColors').checked;
                    const availableColors = randomWithCustom && this.customIconColors.length > 0 
                        ? this.customIconColors 
                        : this.selectedIconColors;
                    
                    // Get contrasting icon color
                    iconColor = this.getContrastingColor(
                        cellColor.hex, 
                        availableColors, 
                        recentIconColors.slice(-maxRecentColors)
                    );
                } else {
                    // Use getContrastingColor even for sequential selection to apply light/dark grouping
                    iconColor = this.getContrastingColor(cellColor.hex, this.selectedIconColors);
                }

                // Select icon based on random arrangement setting
                let iconName;
                if (randomIconColors) {
                    iconName = this.iconList[Math.floor(Math.random() * this.iconList.length)];
                } else {
                    iconName = this.iconList[((row * actualWidth) + col) % this.iconList.length];
                }

                // Update recent color tracking
                recentCellColors.push(cellColor.hex);
                recentIconColors.push(iconColor.hex);
                if (recentCellColors.length > maxRecentColors) {
                    recentCellColors.shift();
                    recentIconColors.shift();
                }

                this.currentWall.cells.push({
                    row,
                    col,
                    x: (col * cellWidth) + (this.previewXOffset || 0),
                    y: row * cellHeight,
                    cellColor: cellColor.hex,
                    iconColor: iconColor.hex,
                    iconName,
                    iconScale: iconScale / 100,
                    iconOpacity: iconOpacity / 100
                });
            }
        }

        this.renderWall();
    }

    async renderWall() {
        if (!this.currentWall) return;

        // Clear canvas completely and reset context
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.strokeStyle = 'rgba(0,0,0,0)';
        this.ctx.lineWidth = 0;

        // Fill entire canvas with uniform background if cell backgrounds are disabled
        if (!this.currentWall.showCellBackground) {
            this.ctx.fillStyle = this.currentWall.uniformBackgroundColor;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        for (const cell of this.currentWall.cells) {
            // Draw cell background
            if (this.currentWall.showCellBackground) {
                this.ctx.fillStyle = cell.cellColor;
                this.ctx.fillRect(cell.x, cell.y, this.currentWall.cellWidth, this.currentWall.cellHeight);
            }

            // Debug border settings
            if (cell.row === 0 && cell.col === 0) { // Only log once
                console.log('Border debug:', {
                    showBorder: this.currentWall.showBorder,
                    borderWidth: this.currentWall.borderWidth,
                    borderColor: this.currentWall.borderColor,
                    type: typeof this.currentWall.borderWidth
                });
            }
            
            // Only draw border if explicitly enabled with valid width
            const shouldDrawBorder = this.currentWall.showBorder && 
                                    this.currentWall.borderWidth > 0 && 
                                    Number.isInteger(this.currentWall.borderWidth);
            
            if (shouldDrawBorder) {
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.strokeStyle = this.currentWall.borderColor;
                this.ctx.lineWidth = this.currentWall.borderWidth;
                this.ctx.rect(cell.x, cell.y, this.currentWall.cellWidth, this.currentWall.cellHeight);
                this.ctx.stroke();
                this.ctx.restore();
            }

            // Load and draw icon
            if (this.currentWall.showIcons) {
                await this.drawIcon(cell);
            }
        }
        
        this.ctx.restore();
    }

    async drawIcon(cell) {
        let img = this.iconImages.get(cell.iconName);
        
        if (!img) {
            // Load icon on demand
            try {
                img = new Image();
                img.crossOrigin = 'anonymous';
                await new Promise((resolve, reject) => {
                    img.onload = () => {
                        resolve();
                    };
                    img.onerror = (error) => {
                        console.error(`Failed to load icon: ${cell.iconName}`, error);
                        reject(error);
                    };
                    img.src = `./bhem-icon/${cell.iconName}.png`;
                });
                this.iconImages.set(cell.iconName, img);
            } catch (error) {
                console.warn(`Failed to load icon: ${cell.iconName}`, error);
                // Draw a placeholder if icon fails to load
                this.drawIconPlaceholder(cell);
                return;
            }
        } else {
        }

        // Create colored version of the icon using an off-screen canvas
        const iconSize = Math.min(this.currentWall.cellWidth, this.currentWall.cellHeight) * cell.iconScale;
        const iconOffsetX = (this.currentWall.cellWidth - iconSize) / 2;
        const iconOffsetY = (this.currentWall.cellHeight - iconSize) / 2;

        // Create off-screen canvas for color manipulation
        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = iconSize;
        offscreenCanvas.height = iconSize;
        const offscreenCtx = offscreenCanvas.getContext('2d');

        // Draw the original icon
        offscreenCtx.drawImage(img, 0, 0, iconSize, iconSize);

        // Get image data to manipulate colors
        const imageData = offscreenCtx.getImageData(0, 0, iconSize, iconSize);
        const data = imageData.data;

        // Parse target color
        const targetColor = this.hexToRgb(cell.iconColor);

        // Replace pixels with target color, preserve transparency and shape
        let pixelsChanged = 0;
        for (let i = 0; i < data.length; i += 4) {
            const alpha = data[i + 3];
            if (alpha > 0) { // Only modify non-transparent pixels
                const originalR = data[i];
                const originalG = data[i + 1];
                const originalB = data[i + 2];
                
                // Apply target color directly
                data[i] = targetColor.r;     // Red
                data[i + 1] = targetColor.g; // Green
                data[i + 2] = targetColor.b; // Blue
                // Keep original alpha for shape preservation
                pixelsChanged++;
            }
        }

        // Put the modified image data back
        offscreenCtx.putImageData(imageData, 0, 0);

        // Draw the colored icon to the main canvas with opacity
        this.ctx.save();
        this.ctx.globalAlpha = cell.iconOpacity || 1.0;
        this.ctx.drawImage(
            offscreenCanvas,
            cell.x + iconOffsetX,
            cell.y + iconOffsetY
        );
        this.ctx.restore();
    }

    drawIconPlaceholder(cell) {
        const iconSize = Math.min(this.currentWall.cellWidth, this.currentWall.cellHeight) * cell.iconScale;
        const iconOffsetX = (this.currentWall.cellWidth - iconSize) / 2;
        const iconOffsetY = (this.currentWall.cellHeight - iconSize) / 2;
        
        this.ctx.save();
        this.ctx.globalAlpha = cell.iconOpacity || 1.0;
        this.ctx.fillStyle = cell.iconColor;
        this.ctx.strokeStyle = cell.iconColor;
        this.ctx.lineWidth = 2;
        
        // Draw a simple circle as placeholder
        this.ctx.beginPath();
        this.ctx.arc(
            cell.x + iconOffsetX + iconSize / 2,
            cell.y + iconOffsetY + iconSize / 2,
            iconSize / 4,
            0,
            2 * Math.PI
        );
        this.ctx.stroke();
        
        this.ctx.restore();
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    }

    randomizeAll() {
        // Randomize dimensions
        document.getElementById('wallWidth').value = Math.floor(Math.random() * 15) + 5;
        document.getElementById('wallHeight').value = Math.floor(Math.random() * 12) + 4;
        
        // Randomize icon scale
        const scale = Math.floor(Math.random() * 50) + 40;
        document.getElementById('iconScale').value = scale;
        document.getElementById('iconScaleValue').textContent = scale + '%';
        
        // Randomize checkboxes
        document.getElementById('forceSquare').checked = Math.random() > 0.5;
        document.getElementById('randomCellColors').checked = Math.random() > 0.3;
        document.getElementById('randomIconColors').checked = Math.random() > 0.3;
        
        // Randomize both cell and icon colors
        this.randomizeColorSelection('cell');
        this.randomizeColorSelection('icon');
        
        // Regenerate wall with new settings
        this.generateWall();
    }

    async exportPNG() {
        if (!this.currentWall) {
            alert('Please generate a wall first');
            return;
        }
        
        // Sync current settings with wall state before export
        this.currentWall.showIcons = document.getElementById('showIcons').checked;
        this.currentWall.showCellBackground = document.getElementById('showCellBackground').checked;
        this.currentWall.showBorder = document.getElementById('showBorder').checked;
        
        // Sync output resolution settings
        this.currentWall.outputWidth = parseInt(document.getElementById('outputWidth').value) || 1920;
        this.currentWall.outputHeight = parseInt(document.getElementById('outputHeight').value) || 1080;

        // Create export canvas with output resolution
        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = this.currentWall.outputWidth;
        exportCanvas.height = this.currentWall.outputHeight;
        const exportCtx = exportCanvas.getContext('2d');

        // Calculate cell size for export
        const exportCellWidth = this.currentWall.outputWidth / this.currentWall.width;
        const exportCellHeight = this.currentWall.outputHeight / this.currentWall.height;

        // Fill with uniform background if cell backgrounds are disabled
        if (!this.currentWall.showCellBackground) {
            exportCtx.fillStyle = this.currentWall.uniformBackgroundColor;
            exportCtx.fillRect(0, 0, this.currentWall.outputWidth, this.currentWall.outputHeight);
        }

        // Render high-resolution version
        for (const cell of this.currentWall.cells) {
            const exportX = cell.col * exportCellWidth;
            const exportY = cell.row * exportCellHeight;

            // Draw cell background
            if (this.currentWall.showCellBackground) {
                exportCtx.fillStyle = cell.cellColor;
                exportCtx.fillRect(exportX, exportY, exportCellWidth, exportCellHeight);
            }

            // Draw cell border
            if (this.currentWall.showBorder && this.currentWall.borderWidth > 0) {
                const scaledBorderWidth = this.currentWall.borderWidth * (this.currentWall.outputWidth / this.canvas.width);
                if (scaledBorderWidth > 0) {
                    exportCtx.strokeStyle = this.currentWall.borderColor;
                    exportCtx.lineWidth = scaledBorderWidth;
                    exportCtx.strokeRect(exportX, exportY, exportCellWidth, exportCellHeight);
                }
            }

            // Draw icon at export resolution
            if (this.currentWall.showIcons) {
                await this.drawIconExport(exportCtx, cell, exportX, exportY, exportCellWidth, exportCellHeight);
            }
        }

        const link = document.createElement('a');
        link.download = `bhem-icon-wall-${this.currentWall.width}x${this.currentWall.height}-${this.currentWall.outputWidth}x${this.currentWall.outputHeight}-${Date.now()}.png`;
        link.href = exportCanvas.toDataURL();
        link.click();
    }

    async drawIconExport(ctx, cell, x, y, cellWidth, cellHeight) {
        let img = this.iconImages.get(cell.iconName);
        
        if (!img) {
            try {
                img = new Image();
                img.crossOrigin = 'anonymous';
                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                    img.src = `./bhem-icon/${cell.iconName}.png`;
                });
                this.iconImages.set(cell.iconName, img);
            } catch (error) {
                console.warn(`Failed to load icon for export: ${cell.iconName}`, error);
                return;
            }
        }

        const iconSize = Math.min(cellWidth, cellHeight) * cell.iconScale;
        const iconOffsetX = (cellWidth - iconSize) / 2;
        const iconOffsetY = (cellHeight - iconSize) / 2;

        // Create off-screen canvas for color manipulation
        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = iconSize;
        offscreenCanvas.height = iconSize;
        const offscreenCtx = offscreenCanvas.getContext('2d');

        // Draw and color the icon
        offscreenCtx.drawImage(img, 0, 0, iconSize, iconSize);
        const imageData = offscreenCtx.getImageData(0, 0, iconSize, iconSize);
        const data = imageData.data;
        const targetColor = this.hexToRgb(cell.iconColor);

        for (let i = 0; i < data.length; i += 4) {
            const alpha = data[i + 3];
            if (alpha > 0) {
                // Apply target color directly without intensity modification
                data[i] = targetColor.r;
                data[i + 1] = targetColor.g;
                data[i + 2] = targetColor.b;
            }
        }

        offscreenCtx.putImageData(imageData, 0, 0);
        
        // Apply opacity for export
        ctx.save();
        ctx.globalAlpha = cell.iconOpacity || 1.0;
        ctx.drawImage(offscreenCanvas, x + iconOffsetX, y + iconOffsetY);
        ctx.restore();
    }

    exportSVG() {
        if (!this.currentWall) {
            alert('Please generate a wall first');
            return;
        }

        // Create SVG
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', this.canvas.width);
        svg.setAttribute('height', this.canvas.height);
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

        for (const cell of this.currentWall.cells) {
            // Cell background
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', cell.x);
            rect.setAttribute('y', cell.y);
            rect.setAttribute('width', this.currentWall.cellSize);
            rect.setAttribute('height', this.currentWall.cellSize);
            rect.setAttribute('fill', cell.cellColor);
            rect.setAttribute('stroke', '#44200F');
            rect.setAttribute('stroke-width', '1');
            svg.appendChild(rect);

            // Note: SVG export doesn't include icons due to complexity
            // This would require converting PNG icons to SVG paths
        }

        const svgData = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.download = `bhem-icon-wall-${Date.now()}.svg`;
        link.href = url;
        link.click();
        
        URL.revokeObjectURL(url);
    }

    updateCanvasSize() {
        if (!this.currentWall) return;
        
        // Use proper preview dimension calculation that respects aspect ratio
        this.updatePreviewDimensions();
    }
    
    updateOutputResolution() {
        if (!this.currentWall) {
            console.warn('No currentWall, cannot update output resolution');
            return;
        }
        
        // Update the wall's output resolution settings
        const outputWidth = parseInt(document.getElementById('outputWidth').value) || 1920;
        const outputHeight = parseInt(document.getElementById('outputHeight').value) || 1080;
        
        this.currentWall.outputWidth = outputWidth;
        this.currentWall.outputHeight = outputHeight;
        
        // Recalculate preview dimensions based on new output aspect ratio
        this.updatePreviewDimensions();
    }
    
    updatePreviewDimensions() {
        if (!this.currentWall) return;
        
        const outputWidth = this.currentWall.outputWidth;
        const outputHeight = this.currentWall.outputHeight;
        const width = this.currentWall.width;
        const height = this.currentWall.height;
        const forceSquare = document.getElementById('forceSquare').checked;
        
        // Recalculate preview dimensions based on output aspect ratio
        const outputAspectRatio = outputWidth / outputHeight;
        const maxCanvasWidth = window.innerWidth - 340; // Account for panel
        const maxCanvasHeight = window.innerHeight - 40;
        
        let previewWidth, previewHeight;
        
        // Scale to fit viewport while maintaining output resolution aspect ratio
        if (maxCanvasWidth / maxCanvasHeight > outputAspectRatio) {
            // Height is the limiting factor
            previewHeight = maxCanvasHeight;
            previewWidth = previewHeight * outputAspectRatio;
        } else {
            // Width is the limiting factor
            previewWidth = maxCanvasWidth;
            previewHeight = previewWidth / outputAspectRatio;
        }
        
        // Calculate cell sizes for preview
        let cellWidth, cellHeight, actualWidth = width;
        if (forceSquare) {
            // For square cells, calculate based on output resolution
            const outputCellSize = outputHeight / height; // Use height as reference
            const previewScale = previewHeight / outputHeight;
            cellWidth = cellHeight = outputCellSize * previewScale;
            
            // Calculate how many cells can fit in the preview width
            const maxCellsInWidth = Math.floor(previewWidth / cellWidth);
            
            // If we can fit more cells, expand the grid to fill the width
            if (maxCellsInWidth > width) {
                actualWidth = maxCellsInWidth;
                // Center the original grid within the expanded grid
                this.previewXOffset = 0;
                this.originalGridStartCol = Math.floor((actualWidth - width) / 2);
            } else {
                // Original behavior: center the grid
                const gridWidth = width * cellWidth;
                const xOffset = (previewWidth - gridWidth) / 2;
                this.previewXOffset = xOffset;
                this.originalGridStartCol = 0;
            }
        } else {
            cellWidth = previewWidth / width;
            cellHeight = previewHeight / height;
            this.previewXOffset = 0;
            this.originalGridStartCol = 0;
        }
        
        // Update canvas dimensions
        this.canvas.width = previewWidth;
        this.canvas.height = previewHeight;
        this.canvas.style.width = previewWidth + 'px';
        this.canvas.style.height = previewHeight + 'px';
        
        // Update current wall dimensions
        this.currentWall.cellWidth = cellWidth;
        this.currentWall.cellHeight = cellHeight;
        
        // Recalculate cell positions
        this.currentWall.cells.forEach(cell => {
            cell.x = (cell.col * cellWidth) + (this.previewXOffset || 0);
            cell.y = cell.row * cellHeight;
        });
        
        // Re-render the wall with new dimensions
        this.renderWall();
    }

    // Incremental update methods for better performance
    updateIconScale() {
        if (!this.currentWall) return;
        
        const iconScale = parseInt(document.getElementById('iconScale').value) || 70;
        
        // Update scale for all cells
        this.currentWall.cells.forEach(cell => {
            cell.iconScale = iconScale / 100;
        });
        
        // Re-render only the icons
        this.renderIconsOnly();
    }
    
    updateIconOpacity() {
        if (!this.currentWall) return;
        
        const iconOpacity = parseInt(document.getElementById('iconOpacity').value) || 100;
        
        // Update opacity for all cells
        this.currentWall.cells.forEach(cell => {
            cell.iconOpacity = iconOpacity / 100;
        });
        
        // Re-render only the icons
        this.renderIconsOnly();
    }
    
    updateCellColors() {
        if (!this.currentWall) {
            this.generateWall();
            return;
        }
        
        // Always respect the user's showCellBackground setting
        this.currentWall.showCellBackground = document.getElementById('showCellBackground').checked;
        
        if (this.selectedCellColors.length === 0) {
            this.renderCellBackgroundsOnly();
            return;
        }
        
        const randomCellColors = document.getElementById('randomCellColors').checked;
        const randomWithCustomCell = document.getElementById('randomWithCustomCellColors').checked;
        
        // Update cell colors
        this.currentWall.cells.forEach((cell, index) => {
            let cellColor;
            if (randomCellColors) {
                const availableCellColors = randomWithCustomCell && this.customCellColors.length > 0 
                    ? this.customCellColors 
                    : this.selectedCellColors;
                cellColor = availableCellColors[Math.floor(Math.random() * availableCellColors.length)];
            } else {
                cellColor = this.selectedCellColors[index % this.selectedCellColors.length];
            }
            cell.cellColor = cellColor.hex;
        });
        
        this.renderCellBackgroundsOnly();
    }
    
    updateIconColors() {
        if (!this.currentWall) {
            this.generateWall();
            return;
        }
        
        if (this.selectedIconColors.length === 0) {
            // Hide icons when no colors selected
            this.currentWall.showIcons = false;
            this.renderCellBackgroundsOnly();
            return;
        }
        
        const randomIconColors = document.getElementById('randomIconColors').checked;
        const randomWithCustom = document.getElementById('randomWithCustomColors').checked;
        
        // Update icon colors and names
        this.currentWall.cells.forEach((cell, index) => {
            let iconColor;
            if (randomIconColors) {
                const availableColors = randomWithCustom && this.customIconColors.length > 0 
                    ? this.customIconColors 
                    : this.selectedIconColors;
                iconColor = this.getContrastingColor(cell.cellColor, availableColors);
                // Also randomize icon when random arrangement is enabled
                cell.iconName = this.iconList[Math.floor(Math.random() * this.iconList.length)];
            } else {
                // Use getContrastingColor even for sequential selection to apply light/dark grouping
                iconColor = this.getContrastingColor(cell.cellColor, this.selectedIconColors);
                // Use sequential icon arrangement when not random
                cell.iconName = this.iconList[index % this.iconList.length];
            }
            cell.iconColor = iconColor.hex;
        });
        
        this.renderIconsOnly();
    }
    
    updateBorders() {
        if (!this.currentWall) return;
        
        this.currentWall.showBorder = document.getElementById('showBorder').checked;
        this.currentWall.borderColor = document.getElementById('borderColor').value;
        this.currentWall.borderWidth = parseInt(document.getElementById('borderWidth').value) || 0;
        
        // Use incremental update instead of full render
        this.renderCellBackgroundsOnly();
    }
    
    updateBackground() {
        if (!this.currentWall) return;
        
        this.currentWall.uniformBackgroundColor = document.getElementById('uniformBackgroundColor').value;
        
        // Use incremental update instead of full render
        this.renderCellBackgroundsOnly();
    }
    
    async renderCellBackgroundsOnly() {
        if (!this.currentWall) return;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Fill uniform background if cell backgrounds are disabled OR no cell colors available
        if (!this.currentWall.showCellBackground || this.selectedCellColors.length === 0) {
            this.ctx.fillStyle = this.currentWall.uniformBackgroundColor;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        } else {
            // Render cell backgrounds only if colors are available
            for (const cell of this.currentWall.cells) {
                if (cell.cellColor) {
                    this.ctx.fillStyle = cell.cellColor;
                    this.ctx.fillRect(cell.x, cell.y, this.currentWall.cellWidth, this.currentWall.cellHeight);
                }
            }
        }
        
        // Render borders
        for (const cell of this.currentWall.cells) {
            const shouldDrawBorder = this.currentWall.showBorder && 
                                    this.currentWall.borderWidth > 0 && 
                                    Number.isInteger(this.currentWall.borderWidth);
            
            if (shouldDrawBorder) {
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.strokeStyle = this.currentWall.borderColor;
                this.ctx.lineWidth = this.currentWall.borderWidth;
                this.ctx.rect(cell.x, cell.y, this.currentWall.cellWidth, this.currentWall.cellHeight);
                this.ctx.stroke();
                this.ctx.restore();
            }
        }
        
        // Render icons
        const showIcons = document.getElementById('showIcons').checked;
        if (showIcons && this.selectedIconColors.length > 0) {
            for (const cell of this.currentWall.cells) {
                await this.drawIcon(cell);
            }
        } else {
        }
    }
    
    async renderIconsOnly() {
        if (!this.currentWall) return;
        
        // Just re-render everything for icon color changes
        await this.renderCellBackgroundsOnly();
    }

    // Export all current settings to JSON file
    exportSettings() {
        try {
            const settings = {
                // Output settings
                outputWidth: document.getElementById('outputWidth').value,
                outputHeight: document.getElementById('outputHeight').value,
                maintainAspectRatio: document.getElementById('maintainAspectRatio').checked,
                
                // Grid settings
                wallWidth: document.getElementById('wallWidth').value,
                wallHeight: document.getElementById('wallHeight').value,
                forceSquare: document.getElementById('forceSquare').checked,
                
                // Border settings
                borderColor: document.getElementById('borderColor').value,
                borderWidth: document.getElementById('borderWidth').value,
                showBorder: document.getElementById('showBorder').checked,
                
                // Display options
                avoidSimilarColors: document.getElementById('avoidSimilarColors').checked,
                
                // Cell settings
                showCellBackground: document.getElementById('showCellBackground').checked,
                randomCellColors: document.getElementById('randomCellColors').checked,
                uniformBackgroundColor: document.getElementById('uniformBackgroundColor').value,
                randomWithCustomCellColors: document.getElementById('randomWithCustomCellColors').checked,
                customCellColors: document.getElementById('customCellColors').value,
                
                // Icon settings
                showIcons: document.getElementById('showIcons').checked,
                randomIconColors: document.getElementById('randomIconColors').checked,
                iconScale: document.getElementById('iconScale').value,
                iconOpacity: document.getElementById('iconOpacity').value,
                randomWithCustomColors: document.getElementById('randomWithCustomColors').checked,
                customIconColors: document.getElementById('customIconColors').value,
                
                // Color selections
                selectedCellColors: this.selectedCellColors.map(c => c.hex),
                selectedIconColors: this.selectedIconColors.map(c => c.hex),
                customIconColorsArray: this.customIconColors.map(c => c.hex),
                customCellColorsArray: this.customCellColors.map(c => c.hex),
                
                // Metadata
                exportDate: new Date().toISOString(),
                version: '1.0'
            };

            const jsonData = JSON.stringify(settings, null, 2);
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.download = `bhem-icon-wall-settings-${Date.now()}.json`;
            link.href = url;
            link.click();
            
            URL.revokeObjectURL(url);
            console.log('Settings exported successfully');
            
        } catch (error) {
            console.error('Error exporting settings:', error);
            alert('Error exporting settings. Please try again.');
        }
    }

    // Import settings from JSON file
    async importSettings(event) {
        try {
            const file = event.target.files[0];
            if (!file) return;

            const text = await file.text();
            const settings = JSON.parse(text);
            

            // Apply output settings
            if (settings.outputWidth) document.getElementById('outputWidth').value = settings.outputWidth;
            if (settings.outputHeight) document.getElementById('outputHeight').value = settings.outputHeight;
            if (typeof settings.maintainAspectRatio === 'boolean') {
                document.getElementById('maintainAspectRatio').checked = settings.maintainAspectRatio;
            }
            
            // Apply grid settings
            if (settings.wallWidth) document.getElementById('wallWidth').value = settings.wallWidth;
            if (settings.wallHeight) document.getElementById('wallHeight').value = settings.wallHeight;
            if (typeof settings.forceSquare === 'boolean') {
                document.getElementById('forceSquare').checked = settings.forceSquare;
            }
            
            // Apply border settings
            if (settings.borderColor) document.getElementById('borderColor').value = settings.borderColor;
            if (settings.borderWidth) document.getElementById('borderWidth').value = settings.borderWidth;
            if (typeof settings.showBorder === 'boolean') {
                document.getElementById('showBorder').checked = settings.showBorder;
            }
            
            // Apply display options
            if (typeof settings.avoidSimilarColors === 'boolean') {
                document.getElementById('avoidSimilarColors').checked = settings.avoidSimilarColors;
            }
            
            // Apply cell settings
            if (typeof settings.showCellBackground === 'boolean') {
                document.getElementById('showCellBackground').checked = settings.showCellBackground;
            }
            if (typeof settings.randomCellColors === 'boolean') {
                document.getElementById('randomCellColors').checked = settings.randomCellColors;
            }
            if (settings.uniformBackgroundColor) {
                document.getElementById('uniformBackgroundColor').value = settings.uniformBackgroundColor;
            }
            if (typeof settings.randomWithCustomCellColors === 'boolean') {
                document.getElementById('randomWithCustomCellColors').checked = settings.randomWithCustomCellColors;
            }
            if (settings.customCellColors) {
                document.getElementById('customCellColors').value = settings.customCellColors;
            }
            
            // Apply icon settings
            if (typeof settings.showIcons === 'boolean') {
                document.getElementById('showIcons').checked = settings.showIcons;
            }
            if (typeof settings.randomIconColors === 'boolean') {
                document.getElementById('randomIconColors').checked = settings.randomIconColors;
            }
            if (settings.iconScale) {
                document.getElementById('iconScale').value = settings.iconScale;
                document.getElementById('iconScaleValue').textContent = settings.iconScale + '%';
            }
            if (settings.iconOpacity) {
                document.getElementById('iconOpacity').value = settings.iconOpacity;
                document.getElementById('iconOpacityValue').textContent = settings.iconOpacity + '%';
            }
            if (typeof settings.randomWithCustomColors === 'boolean') {
                document.getElementById('randomWithCustomColors').checked = settings.randomWithCustomColors;
            }
            if (settings.customIconColors) {
                document.getElementById('customIconColors').value = settings.customIconColors;
            }
            
            // Apply color selections
            if (settings.selectedCellColors) {
                this.selectedCellColors = settings.selectedCellColors.map(hex => 
                    this.allColors.find(c => c.hex === hex) || 
                    { name: 'Custom', hex: hex }
                );
            }
            if (settings.selectedIconColors) {
                this.selectedIconColors = settings.selectedIconColors.map(hex => 
                    this.allColors.find(c => c.hex === hex) || 
                    { name: 'Custom', hex: hex }
                );
            }
            
            // Apply custom colors directly from arrays
            if (settings.customIconColorsArray && settings.customIconColorsArray.length > 0) {
                this.customIconColors = settings.customIconColorsArray.map((hex, index) => ({ 
                    name: `Custom ${index + 1}`, 
                    hex: hex,
                    isCustom: true 
                }));
                // Add to selected colors if not already present
                this.customIconColors.forEach(customColor => {
                    const exists = this.selectedIconColors.some(c => c.hex === customColor.hex);
                    if (!exists) {
                        this.selectedIconColors.push(customColor);
                    }
                });
            }
            
            if (settings.customCellColorsArray && settings.customCellColorsArray.length > 0) {
                this.customCellColors = settings.customCellColorsArray.map((hex, index) => ({ 
                    name: `Custom ${index + 1}`, 
                    hex: hex,
                    isCustom: true 
                }));
                // Add to selected colors if not already present
                this.customCellColors.forEach(customColor => {
                    const exists = this.selectedCellColors.some(c => c.hex === customColor.hex);
                    if (!exists) {
                        this.selectedCellColors.push(customColor);
                    }
                });
            }
            
            // Update UI displays and states
            this.populateColorList('cellColorList', this.selectedCellColors, (colors) => {
                this.selectedCellColors = colors;
            });
            this.populateColorList('iconColorList', this.selectedIconColors, (colors) => {
                this.selectedIconColors = colors;
            });
            
            // Update any dependent UI elements
            if (settings.forceSquare) {
                this.adjustColumnsForSquare();
            }
            
            // Generate wall (this includes all preview calculations)
            this.generateWall();
            
            // Reset file input
            event.target.value = '';
            
            console.log('Settings imported successfully');
            alert('Settings imported successfully!');
            
        } catch (error) {
            console.error('Error importing settings:', error);
            console.error('Error details:', error.message);
            console.error('Error stack:', error.stack);
            alert(`Error importing settings: ${error.message}\n\nPlease check the console for details and ensure the file format is correct.`);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.generator = new BHEMIconWallGenerator();
    } catch (error) {
        console.error('Error creating generator:', error);
    }
});