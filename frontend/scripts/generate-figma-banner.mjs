import fs from 'fs';
import path from 'path';

const b64Path = path.resolve('d:/Brandmindz/preggos/Preggos-Frontend/frontend/src/assets/images/home/hero-lifestyle-b64.txt');
const imageB64 = fs.readFileSync(b64Path, 'utf8').trim();

// Refined vertical coordinates for perfect 1440x360 hierarchy:
// Heading: y=68, y=122
// Supporting text: y=160, y=180
// Trust badges: y=208
// CTA buttons: y=238 (h=42 -> bottom 280)
// Social proof: y=294 (bottom 316)
// Bottom wave: y=328 to 360

const svgContent = `<svg width="1440" height="360" viewBox="0 0 1440 360" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&amp;family=Plus+Jakarta+Sans:wght@500;600;700;800&amp;display=swap');
      .font-heading { font-family: 'Caveat', cursive, sans-serif; }
      .font-body { font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; }
    </style>
    
    <!-- Organic Inward Curve Mask for Hero Image -->
    <clipPath id="hero-image-organic-clip">
      <path d="M 645 0 L 1440 0 L 1440 360 L 590 360 C 590 320 610 270 646 225 C 678 185 688 145 678 95 C 668 55 652 25 645 0 Z" />
    </clipPath>

    <!-- Drop Shadow Filter for CTA Buttons -->
    <filter id="btn-shadow" x="-8%" y="-15%" width="120%" height="150%" filterUnits="objectBoundingBox">
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#0c2340" flood-opacity="0.14" />
    </filter>

    <filter id="avatar-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#0c2340" flood-opacity="0.12" />
    </filter>
  </defs>

  <!-- Background Warm Cream Canvas -->
  <rect id="Canvas_Background" width="1440" height="360" fill="#FFFDF7" />

  <!-- ======================================================= -->
  <!-- 1. GROUP: Hero Image (Organized for Figma)              -->
  <!-- ======================================================= -->
  <g id="Hero Image">
    <!-- Masked Lifestyle Photo -->
    <g id="Masked_Lifestyle_Photo" clip-path="url(#hero-image-organic-clip)">
      <image id="Lifestyle_Photo" x="460" y="0" width="980" height="360" preserveAspectRatio="xMidYMid slice" href="data:image/jpeg;base64,${imageB64}" />
    </g>

    <!-- Vector Doodles around Note and Characters -->
    <g id="Photo_Overlay_Decorations">
      <!-- Heart doodle between Mom & Daughter -->
      <path id="Doodle_Heart_Center" d="M 688 128 C 685 123 679 123 677 127 C 675 131 679 135 688 141 C 697 135 701 131 699 127 C 697 123 691 123 688 128 Z" stroke="#0C2340" stroke-width="2" fill="none" />
      
      <!-- Crown doodle above Daughter -->
      <path id="Doodle_Crown_Daughter" d="M 776 86 L 781 76 L 787 83 L 793 75 L 798 85 Z" stroke="#FDB813" stroke-width="2" stroke-linejoin="round" fill="none" />

      <!-- Pinned Note Editable Text Group in Figma -->
      <g id="Pinned_Note_Layer" transform="translate(1220, 32) rotate(3)">
        <!-- Invisible hit-area/frame for Figma editing -->
        <rect width="160" height="150" fill="transparent" />
        <text class="font-heading" font-size="19" font-weight="700" fill="#0C2340" text-anchor="middle" opacity="0.01">
          <tspan x="80" y="44">Nutrition</tspan>
          <tspan x="80" y="68">for Today,</tspan>
          <tspan x="80" y="93">Wellness for</tspan>
          <tspan x="80" y="117">Tomorrow!</tspan>
        </text>
      </g>
    </g>
  </g>

  <!-- ======================================================= -->
  <!-- 2. GROUP: Decorations (Organized for Figma)             -->
  <!-- ======================================================= -->
  <g id="Decorations">
    <!-- Top-Left Large Partial Yellow Sun -->
    <g id="Top_Left_Sun">
      <ellipse cx="0" cy="0" rx="135" ry="135" fill="#FBAF3C" />
      <ellipse cx="0" cy="0" rx="146" ry="146" stroke="#F5A623" stroke-width="2.5" fill="none" opacity="0.85" />
      <!-- Warm orange accent swirl below sun -->
      <path d="M 12 152 C 28 160 50 146 68 155" stroke="#F15A24" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <ellipse cx="28" cy="162" rx="4" ry="2.5" fill="#F15A24" transform="rotate(-15 28 162)" />
    </g>

    <!-- Teal Botanical Leaves along Left Edge -->
    <g id="Left_Botanical_Leaves">
      <!-- Main stalk -->
      <path d="M 10 340 C 22 280 18 210 28 135" stroke="#0E8276" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <!-- Stylized leaves -->
      <path d="M 24 150 C 38 143 52 150 48 163 C 38 167 25 159 24 150 Z" fill="#0E8276" opacity="0.9" />
      <path d="M 22 180 C 10 173 2 180 6 193 C 14 197 22 190 22 180 Z" fill="#0E8276" opacity="0.85" />
      <path d="M 20 215 C 35 207 48 215 45 229 C 34 233 21 225 20 215 Z" fill="#0E8276" opacity="0.9" />
      <path d="M 17 250 C 5 243 -2 250 2 263 C 11 267 18 260 17 250 Z" fill="#0E8276" opacity="0.85" />
      <path d="M 14 285 C 30 278 42 285 40 298 C 30 302 16 294 14 285 Z" fill="#0E8276" opacity="0.9" />
    </g>

    <!-- Teal Organic Shape in Lower-Left Corner -->
    <g id="Lower_Left_Teal_Shape">
      <path d="M 0 235 C 50 235 78 275 72 325 C 68 360 35 360 0 360 Z" fill="#0E8276" opacity="0.95" />
      <path d="M 0 260 C 38 260 60 290 55 335 C 50 360 25 360 0 360 Z" fill="#0A6B61" opacity="0.5" />
    </g>

    <!-- Small Yellow Sun Doodle Near Heading -->
    <g id="Sun_Doodle" transform="translate(485, 42)">
      <circle cx="0" cy="0" r="10.5" stroke="#FDB813" stroke-width="2.5" fill="none" />
      <!-- 8 Radial Rays -->
      <line x1="0" y1="-14" x2="0" y2="-20" stroke="#FDB813" stroke-width="2.5" stroke-linecap="round" />
      <line x1="10" y1="-10" x2="15" y2="-15" stroke="#FDB813" stroke-width="2.5" stroke-linecap="round" />
      <line x1="14" y1="0" x2="20" y2="0" stroke="#FDB813" stroke-width="2.5" stroke-linecap="round" />
      <line x1="10" y1="10" x2="15" y2="15" stroke="#FDB813" stroke-width="2.5" stroke-linecap="round" />
      <line x1="0" y1="14" x2="0" y2="20" stroke="#FDB813" stroke-width="2.5" stroke-linecap="round" />
      <line x1="-10" y1="10" x2="-15" y2="15" stroke="#FDB813" stroke-width="2.5" stroke-linecap="round" />
      <line x1="-14" y1="0" x2="-20" y2="0" stroke="#FDB813" stroke-width="2.5" stroke-linecap="round" />
      <line x1="-10" y1="-10" x2="-15" y2="-15" stroke="#FDB813" stroke-width="2.5" stroke-linecap="round" />
    </g>

    <!-- Small Hand-Drawn Hearts & Doodles -->
    <g id="Hand_Drawn_Doodles">
      <!-- Soft teal doodle heart left of "Healthy Daughter" -->
      <path id="Teal_Heart_Left" d="M 148 114 C 145 109 138 109 136 113 C 134 117 138 121 148 127 C 158 121 162 117 160 113 C 158 109 151 109 148 114 Z" stroke="#0E8276" stroke-width="1.8" fill="none" />
      
      <!-- Small orange flourish under "Daughter" -->
      <path id="Orange_Flourish_Under" d="M 462 136 C 472 140 482 134 487 140 C 489 143 485 146 477 144" stroke="#F15A24" stroke-width="1.8" stroke-linecap="round" fill="none" />
    </g>

    <!-- Small Orange Botanical Branch between Text and Photo -->
    <g id="Orange_Botanical_Branch" transform="translate(575, 205)">
      <!-- Main stem -->
      <path d="M 6 120 C 14 85 12 50 18 10" stroke="#E27244" stroke-width="2" stroke-linecap="round" fill="none" />
      <!-- Branching leaves -->
      <path d="M 17 22 C 28 15 38 20 35 30 C 26 34 16 28 17 22 Z" stroke="#E27244" stroke-width="1.4" fill="#E27244" fill-opacity="0.25" />
      <path d="M 14 48 C 2 40 -6 48 -2 58 C 7 62 14 55 14 48 Z" stroke="#E27244" stroke-width="1.4" fill="#E27244" fill-opacity="0.25" />
      <path d="M 13 76 C 26 68 35 74 32 84 C 23 88 13 82 13 76 Z" stroke="#E27244" stroke-width="1.4" fill="#E27244" fill-opacity="0.25" />
      <path d="M 9 102 C -1 94 -8 102 -4 112 C 4 116 10 109 9 102 Z" stroke="#E27244" stroke-width="1.4" fill="#E27244" fill-opacity="0.25" />
    </g>
  </g>

  <!-- ======================================================= -->
  <!-- 3. GROUP: Hero Text (Organized for Figma)               -->
  <!-- ======================================================= -->
  <g id="Hero Text">
    <!-- Main Headline - Line 1: Dark Navy -->
    <text id="Heading_Line1" class="font-heading" x="180" y="68" font-size="54" font-weight="700" fill="#0C2340">Happy Mom,</text>

    <!-- Main Headline - Line 2: Teal -->
    <text id="Heading_Line2" class="font-heading" x="180" y="122" font-size="56" font-weight="700" fill="#0E8276">Healthy Daughter</text>

    <!-- Supporting Text (Compact horizontal lines) -->
    <text id="Supporting_Text" class="font-body" font-size="14" font-weight="600" fill="#1E344F">
      <tspan x="180" y="160">Wholesome nutrition for every beautiful stage of her life —</tspan>
      <tspan x="180" y="180">from your bump to her dreams!</tspan>
    </text>

    <!-- Social Proof Group -->
    <g id="Social_Proof" transform="translate(180, 292)">
      <!-- 4 Circular Avatars -->
      <g id="Avatar_Group" filter="url(#avatar-shadow)">
        <circle cx="12" cy="12" r="11" fill="#F8C3CE" stroke="#FFFDF7" stroke-width="2" />
        <text x="12" y="16" font-size="11" text-anchor="middle">👩🏽</text>

        <circle cx="28" cy="12" r="11" fill="#F7B3B8" stroke="#FFFDF7" stroke-width="2" />
        <text x="28" y="16" font-size="11" text-anchor="middle">👩🏻</text>

        <circle cx="44" cy="12" r="11" fill="#B8D3F1" stroke="#FFFDF7" stroke-width="2" />
        <text x="44" y="16" font-size="11" text-anchor="middle">👩🏾</text>

        <circle cx="60" cy="12" r="11" fill="#DFF4EB" stroke="#FFFDF7" stroke-width="2" />
        <text x="60" y="16" font-size="11" text-anchor="middle">👩🏼</text>
      </g>

      <!-- Social Proof Text -->
      <text id="Social_Proof_Text" class="font-body" x="82" y="16" font-size="12.5" font-weight="700" fill="#0C2340">Trusted by 50,000+ Happy Moms</text>
    </g>
  </g>

  <!-- ======================================================= -->
  <!-- 4. GROUP: Trust Badges (Organized for Figma)            -->
  <!-- ======================================================= -->
  <g id="Trust Badges" transform="translate(180, 206)">
    <!-- Badge 1: Healthy Ingredients -->
    <g id="Badge_Healthy_Ingredients">
      <path d="M 0 8 C 0 3 6 0 11 0 C 12 5 9 11 4 12 C 0 13 0 8 0 8 Z M 4 12 L 0 16" stroke="#0E8276" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      <text class="font-body" x="18" y="12" font-size="12" font-weight="700" fill="#0C2340">Healthy Ingredients</text>
    </g>

    <!-- Badge 2: No Preservatives -->
    <g id="Badge_No_Preservatives" transform="translate(156, 0)">
      <path d="M 5 0 L 9 0 M 7 0 L 7 4 L 1 14 C 0 16 1 17 3 17 L 11 17 C 13 17 14 16 13 14 L 7 4" stroke="#0E8276" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      <line x1="4" y1="11" x2="10" y2="11" stroke="#0E8276" stroke-width="1.5" />
      <text class="font-body" x="20" y="12" font-size="12" font-weight="700" fill="#0C2340">No Preservatives</text>
    </g>

    <!-- Badge 3: Made with Love -->
    <g id="Badge_Made_With_Love" transform="translate(295, 0)">
      <path d="M 8 15 C 3 10 0 7 2 3 C 5 0 8 3 8 5 C 8 3 11 0 14 3 C 16 7 13 10 8 15 Z" stroke="#F15A24" stroke-width="1.8" stroke-linejoin="round" fill="none" />
      <text class="font-body" x="22" y="12" font-size="12" font-weight="700" fill="#0C2340">Made with Love</text>
    </g>
  </g>

  <!-- ======================================================= -->
  <!-- 5. GROUP: CTA Buttons (Organized for Figma)             -->
  <!-- ======================================================= -->
  <g id="CTA Buttons" transform="translate(180, 236)">
    <!-- Orange CTA: Shop for Mom -->
    <g id="CTA_Shop_For_Mom" filter="url(#btn-shadow)">
      <rect id="Btn_Bg_Mom" x="0" y="0" width="164" height="40" rx="20" fill="#F15A24" />
      <text class="font-body" x="22" y="25" font-size="13" font-weight="700" fill="#FFFFFF">Shop for Mom</text>
      <!-- Arrow Icon -->
      <path d="M 124 20 L 138 20 M 132 15 L 138 20 L 132 25" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </g>

    <!-- Yellow CTA: Shop for Daughter -->
    <g id="CTA_Shop_For_Daughter" transform="translate(176, 0)" filter="url(#btn-shadow)">
      <rect id="Btn_Bg_Daughter" x="0" y="0" width="186" height="40" rx="20" fill="#FDB813" />
      <text class="font-body" x="22" y="25" font-size="13" font-weight="700" fill="#0C2340">Shop for Daughter</text>
      <!-- Arrow Icon -->
      <path d="M 148 20 L 162 20 M 156 15 L 162 20 L 156 25" stroke="#0C2340" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </g>
  </g>

  <!-- ======================================================= -->
  <!-- 6. GROUP: Bottom Wave (Organized for Figma)             -->
  <!-- ======================================================= -->
  <g id="Bottom Wave">
    <!-- Soft Pale Blue Wave Fill -->
    <path id="Wave_Fill" d="M 0 334 C 200 322 360 348 560 336 C 760 324 960 348 1160 334 C 1260 328 1360 336 1440 338 L 1440 360 L 0 360 Z" fill="#E8F3FD" />
    
    <!-- Thin Blue Outline along Top of Wave -->
    <path id="Wave_Outline" d="M 0 334 C 200 322 360 348 560 336 C 760 324 960 348 1160 334 C 1260 328 1360 336 1440 338" stroke="#7EB2E0" stroke-width="1.6" stroke-linecap="round" fill="none" />
  </g>
</svg>`;

// Write to public directory
fs.writeFileSync('d:/Brandmindz/preggos/Preggos-Frontend/frontend/public/preggos-hero-banner.svg', svgContent);
// Write to project root
fs.writeFileSync('d:/Brandmindz/preggos/preggos-hero-banner.svg', svgContent);
// Write to artifacts
fs.writeFileSync('C:/Users/saran/.gemini/antigravity-ide/brain/987e6a91-c565-49cb-a4e8-a03f8338c030/preggos-hero-banner.svg', svgContent);

console.log('Refined SVG generated successfully in all locations!');
