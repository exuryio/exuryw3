#!/usr/bin/env node

/**
 * Generate PWA Icons Script
 * 
 * Generates all required PWA icon sizes from a source icon.
 * 
 * Requirements:
 * - sharp: npm install --save-dev sharp
 * 
 * Usage:
 *   node scripts/generate-pwa-icons.js [source-icon-path]
 * 
 * Default source: public/pwa-icon-source.png (or public/iconoblack.png as fallback)
 */

const fs = require('fs');
const path = require('path');

// Icon sizes required for PWA
const ICON_SIZES = [
  { size: 192, name: 'icon-192x192.png' },
  { size: 512, name: 'icon-512x512.png' },
  { size: 180, name: 'apple-touch-icon.png' }, // iOS
];

const OUTPUT_DIR = path.join(__dirname, '../public/icons');
const SOURCE_ICON = process.argv[2] || 
  path.join(__dirname, '../public/pwa-icon-source.png') ||
  path.join(__dirname, '../public/iconoblack.png');

async function generateIcons() {
  try {
    // Check if sharp is available
    let sharp;
    try {
      sharp = require('sharp');
    } catch (error) {
      console.error('❌ Error: sharp is not installed.');
      console.log('📦 Install it with: npm install --save-dev sharp');
      console.log('\n💡 Alternative: Use an online tool like https://realfavicongenerator.net/');
      console.log('   or manually create icons in public/icons/ directory:');
      ICON_SIZES.forEach(({ size, name }) => {
        console.log(`   - ${name} (${size}x${size}px)`);
      });
      process.exit(1);
    }

    // Check if source icon exists
    if (!fs.existsSync(SOURCE_ICON)) {
      console.error(`❌ Source icon not found: ${SOURCE_ICON}`);
      console.log('\n💡 Options:');
      console.log('   1. Create public/pwa-icon-source.png (512x512px recommended)');
      console.log('   2. Use existing iconoblack.png as source');
      console.log('   3. Pass custom path: node scripts/generate-pwa-icons.js /path/to/icon.png');
      process.exit(1);
    }

    // Create output directory if it doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
      console.log(`✅ Created directory: ${OUTPUT_DIR}`);
    }

    console.log(`📸 Source icon: ${SOURCE_ICON}`);
    console.log(`📁 Output directory: ${OUTPUT_DIR}\n`);

    // Generate each icon size
    for (const { size, name } of ICON_SIZES) {
      const outputPath = path.join(OUTPUT_DIR, name);
      
      await sharp(SOURCE_ICON)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 1 }, // Black background
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Generated: ${name} (${size}x${size}px)`);
    }

    console.log('\n🎉 All PWA icons generated successfully!');
    console.log(`📂 Icons are in: ${OUTPUT_DIR}`);
    
  } catch (error) {
    console.error('❌ Error generating icons:', error.message);
    process.exit(1);
  }
}

// Run the script
generateIcons();

