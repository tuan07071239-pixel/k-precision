/**
 * K-PRECISION OFFICIAL PRODUCT DATABASE
 * High-precision manufacturing consumables, specifications, applications, and operating conditions.
 */

const KP_PRODUCTS = {
  // ==========================================
  // 1. GRINDING TOOLS (DIAMOND & CBN)
  // ==========================================
  "KP-GW-D150-V120": {
    sku: "KP-GW-D150-V120",
    name: "1A1 Diamond Vitrified Peripheral Wheel Ø150mm",
    category: "Grinding Tools",
    categorySlug: "grinding",
    categoryUrl: "grinding-wheels.html",
    badge: "Vitrified Superabrasive",
    image: "assets/images/diagrams/grinding-wheel.svg",
    shortDesc: "Sub-micron precision peripheral grinding wheel for high-volume solid carbide fluting, technical ceramics, cermets, and thermal spray coatings.",
    purpose: "Specifically engineered for CNC 5-axis tool and cutter grinders (Walter, Rollomatic, ANCA, Schütte) to perform primary fluting, OD cylindrical cylindrical grinding, and end gashing of solid tungsten carbide cutting tools with zero thermal surface damage.",
    workpieceMaterials: [
      "Tungsten Carbide (Cobalt binder 6% - 15%)",
      "Technical Ceramics (Silicon Nitride Si3N4, Alumina Al2O3, Zirconia)",
      "Polycrystalline Diamond (PCD) & Cermets",
      "HVOF & Plasma Thermal Spray Hard Coatings"
    ],
    keyFeatures: [
      "Engineered ceramic vitrified bond with controlled micro-porosity for maximum coolant delivery into the grinding arc.",
      "High thermal conductivity prevents micro-cracking and cobalt leaching in carbide substrates.",
      "Dressable on-machine using CNC rotary diamond rolls, holding edge radius tolerances under 0.005mm.",
      "Up to 3x longer dressing intervals compared to standard resinoid wheels, dramatically reducing cycle times."
    ],
    specs: {
      "Standard Profile": "1A1 Straight Peripheral",
      "Outer Diameter (D)": "150 mm",
      "Rim Thickness (T)": "10 mm",
      "Arbor Bore (H)": "31.75 mm (Standard) / Optional H20, H32, H50",
      "Abrasive Layer Depth (X)": "5.0 mm",
      "Superabrasive Type": "Synthetic Monocrystalline Diamond",
      "Grit Size": "D120 (US Mesh 120/140, Mean particle size 125µm)",
      "Abrasive Concentration": "C100 (4.4 carats/cm³)",
      "Bonding Matrix": "Vitrified Porous Ceramic (High Heat Dissipation)",
      "Max Operating Speed": "45 m/s (5,700 RPM max)",
      "Dynamic Balance Runout": "Concentricity TIR < 0.002 mm"
    },
    operatingConditions: {
      "Wheel Peripheral Speed (Vc)": "25 - 38 m/s (Dry run strictly prohibited)",
      "Table Feed Rate (Vf)": "150 - 600 mm/min (depending on carbide cobalt grade)",
      "Depth of Cut (ap)": "0.5 - 3.0 mm (Creep-feed single-pass fluting)",
      "Recommended Coolant": "Synthetic neat grinding oil (viscosity 8 - 12 cSt @ 40°C) at 15 - 25 Bar pressure",
      "Dressing Method": "Rotary Diamond Dressing Roll at speed ratio q = +0.6 to +0.8"
    },
    certifications: "ISO 9001:2015, EN 13236 Safety Standard, Metrology CMM Inspection Sheet enclosed."
  },

  "KP-GW-1V1-D100-B": {
    sku: "KP-GW-1V1-D100-B",
    name: "1V1 Diamond Resinoid Angular Profiling Wheel Ø100mm",
    category: "Grinding Tools",
    categorySlug: "grinding",
    categoryUrl: "grinding-wheels.html",
    badge: "Resinoid 45° Profile",
    image: "assets/images/diagrams/grinding-wheel.svg",
    shortDesc: "45-degree angle diamond wheel designed for precision indexable insert edge preparation, chamfering, and clearance relief angles.",
    purpose: "Ideal for grinding primary and secondary relief angles on carbide inserts, stepped drills, and reamers where elastic bond vibration damping is essential to eliminate micro-chipping on cutting edges.",
    workpieceMaterials: [
      "Micro-grain Tungsten Carbide",
      "Titanium-coated indexable inserts",
      "Cermet cutting tips",
      "Silicon Carbide (SiC) tooling components"
    ],
    keyFeatures: [
      "Phenolic-polyimide resin matrix absorbs high-frequency vibrations, achieving optical mirror finishes (Ra < 0.08µm).",
      "Sharp 45° taper allows clearance access into tight shoulder geometries.",
      "High self-sharpening behavior prevents wheel loading and eliminates chatter marks."
    ],
    specs: {
      "Standard Profile": "1V1 Angular Taper (45°)",
      "Outer Diameter (D)": "100 mm",
      "Rim Thickness (T)": "10 mm",
      "Arbor Bore (H)": "20.0 mm",
      "Profile Angle (V)": "45° Symmetric",
      "Abrasive Layer Depth (X)": "3.0 mm",
      "Superabrasive Type": "Premium Blocky Diamond",
      "Grit Size": "D150 (Mesh 140/170)",
      "Concentration": "C75 (3.3 carats/cm³)",
      "Bonding Matrix": "Advanced Thermoset Resinoid",
      "Max Speed": "35 m/s"
    },
    operatingConditions: {
      "Wheel Peripheral Speed": "22 - 32 m/s",
      "Feed Rate": "100 - 350 mm/min",
      "Depth of Cut (ap)": "0.02 - 0.15 mm per pass",
      "Recommended Coolant": "Water-soluble emulsion (8-10% concentration) or low-viscosity grinding oil",
      "Dressing Method": "Silicon carbide dressing stick (Al2O3 / SiC brake dresser)"
    },
    certifications: "ISO 9001:2015, Dynamic Balancing Grade G1.0 @ 6,000 RPM."
  },

  "KP-GW-CBN-11V9-100": {
    sku: "KP-GW-CBN-11V9-100",
    name: "11V9 CBN Resin Fluting & End Gashing Cup Wheel Ø100mm",
    category: "Grinding Tools",
    categorySlug: "grinding",
    categoryUrl: "grinding-wheels.html",
    badge: "CBN Cup Superabrasive",
    image: "assets/images/diagrams/grinding-wheel.svg",
    shortDesc: "70-degree cup wheel engineered for fluting and end tooth gashing of High-Speed Steel (HSS), cobalt steel, and hardened tool steels.",
    purpose: "Designed for tool manufacturing and re-sharpening operations on high-speed CNC grinders. Cubic Boron Nitride (CBN) does not react chemically with iron at elevated temperatures, providing extreme wheel life on ferrous steels.",
    workpieceMaterials: [
      "Hardened Tool Steels: H13, D2, S7, O1 (55 - 65 HRC)",
      "Powder Metallurgy High-Speed Steels (PM-HSS, ASP2023, ASP2060)",
      "High-Chromium, High-Vanadium Cold Work Steels",
      "Bearing Steels (100Cr6 / 52100)"
    ],
    keyFeatures: [
      "Zero chemical affinity to iron prevents catalytic wear common with diamond on steel.",
      "70° taper cup geometry provides deep clearance when sharpening multi-flute end mill ends.",
      "Polyimide heat-resistant resin withstands dry touch-ups and heavy wet production grinding."
    ],
    specs: {
      "Standard Profile": "11V9 Taper Cup (70° Angle)",
      "Outer Diameter (D)": "100 mm",
      "Cup Height (T)": "35 mm",
      "Arbor Bore (H)": "20.0 mm",
      "Rim Width (W)": "3.0 mm",
      "Abrasive Depth (X)": "6.0 mm",
      "Abrasive Type": "Cubic Boron Nitride (CBN) Amber crystal",
      "Grit Size": "B126 (Mesh 120/140)",
      "Concentration": "C100 (4.4 ct/cm³)",
      "Bond": "High-Temp Polyimide Resinoid"
    },
    operatingConditions: {
      "Wheel Peripheral Speed": "30 - 45 m/s",
      "Table Feed Rate": "200 - 800 mm/min",
      "Coolant": "Heavy-duty ester-based grinding oil with extreme pressure (EP) additives",
      "Trueing & Dressing": "Brake-controlled truing device with green silicon carbide wheels"
    },
    certifications: "ISO 9001:2015, FEPA Safety Certified."
  },

  "KP-GW-12V9-D125-V": {
    sku: "KP-GW-12V9-D125-V",
    name: "12V9 Diamond Vitrified Dish Wheel Ø125mm",
    category: "Grinding Tools",
    categorySlug: "grinding",
    categoryUrl: "grinding-wheels.html",
    badge: "PCD / Carbide Fine Finishing",
    image: "assets/images/diagrams/grinding-wheel.svg",
    shortDesc: "45-degree dish wheel designed for PCD tool fabrication, fine gashing, and micro-fluting with sub-micron edge definition.",
    purpose: "Specialized for producing razor-sharp cutting edges on polycrystalline diamond (PCD) tipped tooling, woodworking router cutters, and micro-grain carbide drill tips.",
    workpieceMaterials: ["PCD tips", "CVD diamond plates", "Tungsten carbide shanks", "Cermet inserts"],
    keyFeatures: ["Extremely rigid vitrified bonding", "Maintains sub-micron edge radius on cutter flutes", "Superior wheel roundness < 0.001mm"],
    specs: {
      "Standard Profile": "12V9 Dish Cup (45°)",
      "Outer Diameter": "125 mm",
      "Thickness": "25 mm",
      "Bore": "32.0 mm",
      "Grit Size": "D64 Fine (Mesh 230/270)",
      "Concentration": "C125 (5.5 ct/cm³)",
      "Bond": "Vitrified Low-Temperature Glass"
    },
    operatingConditions: {
      "Wheel Speed": "28 - 36 m/s",
      "Infeed": "0.005 - 0.02 mm/pass",
      "Coolant": "Filtered synthetic coolant (1µm filtration)"
    },
    certifications: "ISO 9001:2015 Quality Tested."
  },

  "KP-GW-14A1-CBN200": {
    sku: "KP-GW-14A1-CBN200",
    name: "14A1 CBN Vitrified Stepped Wheel Ø200mm",
    category: "Grinding Tools",
    categorySlug: "grinding",
    categoryUrl: "grinding-wheels.html",
    badge: "Cylindrical Shaft Grinding",
    image: "assets/images/diagrams/grinding-wheel.svg",
    shortDesc: "High-rigidity stepped flange wheel for OD cylindrical, centerless, and precision surface grinding of hardened steel shafts and pins.",
    purpose: "Used in cylindrical CNC grinding machines (Studer, Kellenberger, Toyoda) for high-precision shafts, hydraulic valve spools, and automotive powertrain components.",
    workpieceMaterials: ["Case-hardened steel 16MnCr5", "Tool steel D2 / SKD11 (60+ HRC)", "High-speed steel M2/M35", "Chrome-plated alloy rods"],
    keyFeatures: ["High thermal dissipation vitrified core", "Maintains cylindrical runout under 0.0015mm over 500mm shaft length", "Low dressing frequency"],
    specs: {
      "Standard Profile": "14A1 Stepped Flange",
      "Dimensions": "Ø200 x 15 x 50.8 mm",
      "Abrasive": "CBN Crystal Grade B",
      "Grit": "B91 (Mesh 170/200)",
      "Concentration": "C100",
      "Bond": "Vitrified Ceramic"
    },
    operatingConditions: {
      "Wheel Speed": "45 - 60 m/s (High-speed approved)",
      "Workpiece Speed": "20 - 35 m/min",
      "Coolant": "Neat grinding oil or 10% semi-synthetic emulsion with EP additives"
    },
    certifications: "ISO 9001:2015, Balancing DIN ISO 1940."
  },

  "KP-DR-ROTARY-D125": {
    sku: "KP-DR-ROTARY-D125",
    name: "CNC Rotary Diamond Dressing Roll Ø125mm",
    category: "Grinding Tools",
    categorySlug: "grinding",
    categoryUrl: "grinding-wheels.html",
    badge: "CNC Wheel Dressing",
    image: "assets/images/diagrams/grinding-wheel.svg",
    shortDesc: "Precision CNC rotary dressing disc with reinforced CVD and natural diamond handset profile for automated vitrified wheel profiling.",
    purpose: "Mounted on CNC dressing spindles to automatically dress and true vitrified CBN and diamond grinding wheels, generating accurate wheel forms and sharp cutting grains.",
    workpieceMaterials: ["Vitrified Diamond Wheels", "Vitrified CBN Wheels", "Ceramic Bonded Abrasives"],
    keyFeatures: ["Handset natural diamonds with CVD diamond reinforcement", "Profile form repeatability ±0.0015mm", "Balanced for up to 8,000 RPM dressing spindles"],
    specs: {
      "Outer Diameter": "125 mm",
      "Rim Width": "20 mm",
      "Bore": "52.0 mm (precision ground)",
      "Diamond Type": "Selected Natural Diamond + CVD Inserts",
      "Form Accuracy": "±0.0015 mm",
      "Runout": "< 0.002 mm TIR"
    },
    operatingConditions: {
      "Speed Ratio (q)": "+0.6 to +0.8 (unidirectional dressing)",
      "Radial Infeed (aed)": "0.002 - 0.005 mm/pass",
      "Overlap Ratio (Ud)": "4 - 8"
    },
    certifications: "ISO 9001:2015, Metrology Calibration Protocol."
  },

  // ==========================================
  // 2. CUTTING TOOLS (SOLID CARBIDE)
  // ==========================================
  "KP-EM-4F-D12-ALCRN": {
    sku: "KP-EM-4F-D12-ALCRN",
    name: "4-Flute Variable Helix Solid Carbide End Mill Ø12mm",
    category: "Cutting Tools",
    categorySlug: "cutting",
    categoryUrl: "cutting-tools.html",
    badge: "Sub-Micron Solid Carbide",
    image: "assets/images/diagrams/cutting-tool.svg",
    shortDesc: "High-efficiency anti-vibration roughing and finishing end mill with nano-composite AlCrN coating for hardened steels up to 60 HRC.",
    purpose: "Engineered for heavy metal removal (HEM), dynamic trochoidal milling, and finishing in mold & die making, aerospace brackets, and precision automotive tooling.",
    workpieceMaterials: [
      "Hardened Mold Steels: P20, H13, NAK80, SKD61 (45 - 60 HRC)",
      "Stainless Steels: 304, 316L, 17-4 PH",
      "Alloy & Carbon Steels: 4140, 4340, S45C",
      "Cast Irons: Ductile, Nodular, and Grey"
    ],
    keyFeatures: [
      "Ultra-fine 0.4µm sub-micron tungsten carbide substrate with 10% cobalt for superior edge toughness and wear resistance.",
      "Unequal flute indexing and variable helix (35° / 38°) cancels machining harmonics and eliminates chatter.",
      "AlCrN nano-layer PVD coating provides thermal barrier up to 1,100°C for dry or MQL high-speed machining.",
      "h6 ground shank tolerance ensures 100% clamping reliability in shrink-fit and hydraulic chucks."
    ],
    specs: {
      "Tool Type": "Square Flat End Mill (Center Cutting)",
      "Number of Flutes": "4 Flutes",
      "Helix Angle": "35° / 38° Variable Helix",
      "Cutting Diameter (D1)": "12.0 mm (0 / -0.015mm)",
      "Flute Length (L1)": "30.0 mm",
      "Overall Length (L2)": "75.0 mm",
      "Shank Diameter (D2)": "12.0 mm (h6 tolerance: 0 / -0.008mm)",
      "Corner Preparation": "0.2mm 45° Protective Chamfer",
      "Substrate": "0.4µm Ultra-Fine Micro-Grain Tungstag Carbide (WC+Co)",
      "Coating": "AlCrN Nano-Composite PVD (Hardness 3400 HV)"
    },
    operatingConditions: {
      "Cutting Speed (Vc)": "120 - 180 m/min (Hardened Steel 50 HRC) / 220 m/min (Carbon Steel)",
      "Feed Per Tooth (fz)": "0.06 - 0.12 mm/tooth",
      "Radial Depth (ae)": "0.08 - 0.25 x D (Trochoidal: up to 0.15 x D)",
      "Axial Depth (ap)": "1.0 - 2.0 x D (Trochoidal full flute depth)",
      "Coolant Strategy": "Air blow / MQL for steels > 50 HRC; High-pressure flood emulsion for stainless"
    },
    certifications: "ISO 9001:2015, Laser Concentricity Inspected, Lot Traceability."
  },

  "KP-EM-4F-D06-AL": {
    sku: "KP-EM-4F-D06-AL",
    name: "4-Flute Variable Helix Solid Carbide End Mill Ø6.0mm",
    category: "Cutting Tools",
    categorySlug: "cutting",
    categoryUrl: "cutting-tools.html",
    badge: "High-Feed Milling",
    image: "assets/images/diagrams/cutting-tool.svg",
    shortDesc: "High-speed pocketing and profiling carbide mill for precision mold cavities, medical fixtures, and alloy steel parts.",
    purpose: "Ideal for pocket milling, shoulder contouring, and slotting in tight component features requiring high dimensional accuracy.",
    workpieceMaterials: ["Mold Steels (P20, H13)", "Stainless 304/316", "Titanium Ti-6Al-4V", "Alloy Steels 4140"],
    keyFeatures: ["Variable pitch eliminates chatter at high spindle speeds", "AlCrN coating for extended tool life", "Center cutting allows ramping and helical plunge"],
    specs: {
      "Cutting Diameter": "6.0 mm",
      "Flute Length": "15.0 mm",
      "Overall Length": "50.0 mm",
      "Shank Diameter": "6.0 mm (h6)",
      "Flutes": "4 Flute Variable",
      "Coating": "AlCrN Nano-PVD"
    },
    operatingConditions: {
      "Cutting Speed": "140 - 200 m/min",
      "Feed per tooth (fz)": "0.035 - 0.06 mm/tooth",
      "Coolant": "Flood emulsion or high-pressure air"
    },
    certifications: "ISO 9001:2015 Certified."
  },

  "KP-EM-4F-D10-AL": {
    sku: "KP-EM-4F-D10-AL",
    name: "4-Flute Variable Helix Solid Carbide End Mill Ø10.0mm",
    category: "Cutting Tools",
    categorySlug: "cutting",
    categoryUrl: "cutting-tools.html",
    badge: "Heavy Roughing & Finishing",
    image: "assets/images/diagrams/cutting-tool.svg",
    shortDesc: "Versatile 10mm end mill delivering high metal removal rates with excellent surface roughness in tool steels up to 58 HRC.",
    purpose: "General production milling, dynamic roughing, and fine side-finishing across CNC manufacturing operations.",
    workpieceMaterials: ["Hardened steels up to 58 HRC", "Stainless steels", "Pre-hardened tool steels"],
    keyFeatures: ["Reinforced core diameter increases rigidity by 20%", "Micro-polished flutes prevent chip packing", "h6 shank fits precision holders"],
    specs: {
      "Cutting Diameter": "10.0 mm",
      "Flute Length": "25.0 mm",
      "Overall Length": "75.0 mm",
      "Shank Diameter": "10.0 mm (h6)",
      "Flutes": "4 Flutes",
      "Coating": "AlCrN Nano-PVD"
    },
    operatingConditions: {
      "Cutting Speed": "130 - 190 m/min",
      "Feed per tooth": "0.05 - 0.09 mm/tooth"
    },
    certifications: "ISO 9001:2015."
  },

  "KP-BN-2F-R0.5-D4": {
    sku: "KP-BN-2F-R0.5-D4",
    name: "2-Flute Precision Micro Ball Nose End Mill R0.5 (Ø1.0mm)",
    category: "Cutting Tools",
    categorySlug: "cutting",
    categoryUrl: "cutting-tools.html",
    badge: "Micro-Machining 65 HRC",
    image: "assets/images/diagrams/cutting-tool.svg",
    shortDesc: "Ultra-precision micro ball end mill with TiSiN hard coating (4200 HV) for 3D sculptured surfaces in hardened mold steels up to 65 HRC.",
    purpose: "Dedicated to micro-machining of injection mold cores, optical cavities, semiconductor contact dies, and miniature medical implants.",
    workpieceMaterials: ["Hardened Steels: SKD11, D2, H13 (55 - 65 HRC)", "S-Star, Stavax Stainless Mold Steels", "Pre-sintered ceramics", "Cobalt-Chrome alloy"],
    keyFeatures: [
      "Ball radius tolerance guaranteed within ±0.002 mm (2 microns).",
      "TiSiN coating with extreme hardness 4200 HV resists abrasive wear in high-hardness steels.",
      "Reinforced neck taper prevents tool deflection during high-RPM 3D contouring."
    ],
    specs: {
      "Radius (R)": "R0.5 mm (±0.002mm)",
      "Diameter (D)": "1.0 mm",
      "Flute Length": "2.0 mm",
      "Neck Reach": "6.0 mm",
      "Shank (D2)": "4.0 mm (h5 tolerance)",
      "Overall Length": "50.0 mm",
      "Coating": "TiSiN Ultra-Hard (4200 HV)"
    },
    operatingConditions: {
      "Spindle Speed": "25,000 - 45,000 RPM",
      "Feed per tooth": "0.008 - 0.02 mm/tooth",
      "Stepover (ae)": "0.03 - 0.08 mm",
      "Coolant": "Cold air blast with micro-mist MQL"
    },
    certifications: "ISO 9001:2015, 100% Optical Vision Inspected."
  },

  "KP-BN-2F-R3.0-D6": {
    sku: "KP-BN-2F-R3.0-D6",
    name: "2-Flute Precision Ball Nose End Mill R3.0 (Ø6.0mm)",
    category: "Cutting Tools",
    categorySlug: "cutting",
    categoryUrl: "cutting-tools.html",
    badge: "3D Profile Finishing",
    image: "assets/images/diagrams/cutting-tool.svg",
    shortDesc: "High-precision ball end mill for 3D mold cavity semi-finishing and mirror finishing in hardened tool steels up to 62 HRC.",
    purpose: "Semi-finishing and fine finishing of complex mold and die freeform surfaces, turbine blades, and automotive stamping dies.",
    workpieceMaterials: ["NAK80, H13, 1.2379, 1.2344 (50 - 62 HRC)", "Titanium Alloys", "Inconel 718"],
    keyFeatures: ["Ball contour accuracy ±0.003mm", "TiSiN coating maintains cutting edge sharpness", "Smooth chip evacuation flutes"],
    specs: {
      "Radius": "R3.0 mm (±0.003mm)",
      "Diameter": "6.0 mm",
      "Flute Length": "12.0 mm",
      "Overall Length": "60.0 mm",
      "Shank": "6.0 mm (h6)",
      "Coating": "TiSiN Hard Coat"
    },
    operatingConditions: {
      "Cutting Speed": "120 - 180 m/min",
      "Feed per tooth": "0.03 - 0.07 mm/tooth"
    },
    certifications: "ISO 9001:2015."
  },

  "KP-DR-5XD-D6.8-TC": {
    sku: "KP-DR-5XD-D6.8-TC",
    name: "Through-Coolant Solid Carbide Drill 5xD Ø6.8mm (M8 Tap Pre-Drill)",
    category: "Cutting Tools",
    categorySlug: "cutting",
    categoryUrl: "cutting-tools.html",
    badge: "Internal Coolant 5xD",
    image: "assets/images/diagrams/cutting-tool.svg",
    shortDesc: "High-performance dual spiral internal coolant hole drill for drilling M8 tapping holes in stainless steel, alloy steel, and titanium.",
    purpose: "High-feed holemaking with immediate chip evacuation via internal high-pressure coolant channels, eliminating pecking cycles in deep holes.",
    workpieceMaterials: ["Stainless Steel (304, 316, Duplex)", "Titanium Ti-6Al-4V", "Alloy Steels 4140/4340", "Tool Steels"],
    keyFeatures: [
      "140° self-centering point eliminates pre-spotting.",
      "Dual helical coolant channels supply up to 50 Bar pressure directly to the drill chisel edge.",
      "TiAlN multi-layer PVD coating prevents built-up edge (BUE) on stainless steels."
    ],
    specs: {
      "Drill Diameter": "6.8 mm (m7 tolerance)",
      "Flute Length": "53.0 mm",
      "Overall Length": "91.0 mm",
      "Shank Diameter": "8.0 mm (h6)",
      "Point Angle": "140° Self-Centering",
      "Coolant": "Internal Dual Coolant Ports",
      "Coating": "TiAlN Multi-Layer PVD"
    },
    operatingConditions: {
      "Cutting Speed": "70 - 110 m/min (Stainless) / 110 - 140 m/min (Alloy Steel)",
      "Feed Rate (f)": "0.14 - 0.22 mm/rev",
      "Coolant Pressure": "Minimum 15 Bar (Optimal 25 - 50 Bar)"
    },
    certifications: "ISO 9001:2015 Certified."
  },

  "KP-DR-5XD-D8.5-TC": {
    sku: "KP-DR-5XD-D8.5-TC",
    name: "Through-Coolant Solid Carbide Drill 5xD Ø8.5mm (M10 Tap Pre-Drill)",
    category: "Cutting Tools",
    categorySlug: "cutting",
    categoryUrl: "cutting-tools.html",
    badge: "Internal Coolant 5xD",
    image: "assets/images/diagrams/cutting-tool.svg",
    shortDesc: "High-feed coolant-fed carbide drill for M10 tap pre-drilling in structural steels, mold blocks, and aerospace alloys.",
    purpose: "Deep hole drilling up to 5 times diameter in single-shot operations without chip jamming.",
    workpieceMaterials: ["Carbon Steels", "Alloy Steels", "Stainless Steels", "Inconel & Hastelloy"],
    keyFeatures: ["Exceptional hole cylindrical straightness", "Long tool life with internal coolant flushing", "Rigid web thickness"],
    specs: {
      "Drill Diameter": "8.5 mm (m7)",
      "Flute Length": "61.0 mm",
      "Overall Length": "103.0 mm",
      "Shank Diameter": "10.0 mm (h6)",
      "Coating": "TiAlN PVD"
    },
    operatingConditions: {
      "Cutting Speed": "80 - 130 m/min",
      "Feed Rate": "0.18 - 0.28 mm/rev",
      "Coolant Pressure": "20 - 70 Bar"
    },
    certifications: "ISO 9001:2015."
  },

  // ==========================================
  // 3. TOOL HOLDING SYSTEMS
  // ==========================================
  "KP-TH-BT40-SF12-90": {
    sku: "KP-TH-BT40-SF12-90",
    name: "BT40 Shrink Fit Tool Holder Ø12mm (Gauge Length 90mm)",
    category: "Tool Holding",
    categorySlug: "toolholding",
    categoryUrl: "tool-holding.html",
    badge: "Runout ≤ 0.003mm | G2.5 25k",
    image: "assets/images/diagrams/tool-holding.svg",
    shortDesc: "High-precision inductive thermal clamping holder with slim 3° nose contour for high-speed 5-axis CNC machining centers.",
    purpose: "Delivers maximum clamping force and sub-micron concentricity for high-speed milling, deep mold cavity finishing, and chatter-free cutting with solid carbide cutters.",
    workpieceMaterials: ["Used on all CNC spindles with BT40 MAS 403 / JIS B6339 taper"],
    keyFeatures: [
      "Total Indicated Runout (TIR) guaranteed ≤ 0.003 mm measured at 3x tool diameter (36mm from nose).",
      "Pre-balanced dynamically to ISO 1940-1 Grade G2.5 at 25,000 RPM to safeguard spindle bearings.",
      "High-alloy hot-working tool steel withstands thousands of inductive heating and water-chilling cycles.",
      "Slim 3° outer nose profile provides maximum clearance around deep molds and tall fixtures."
    ],
    specs: {
      "Spindle Interface": "BT40 (MAS 403 / JIS B6339)",
      "Clamping Diameter (d)": "Ø12 mm (for h6 shank cutters)",
      "Gauge Length (A)": "90 mm",
      "Nose Diameter (D1)": "24 mm",
      "Body Diameter (D2)": "32 mm",
      "Runout Accuracy": "≤ 0.003 mm TIR @ 3xD",
      "Balancing Grade": "G2.5 @ 25,000 RPM (fine balancing holes)",
      "Clamping Type": "Thermal Induction Shrink Fit",
      "Coolant Capability": "Through-tool coolant (AD/B dual style ready)"
    },
    operatingConditions: {
      "Max Spindle Speed": "25,000 RPM",
      "Compatible Heating Unit": "Standard 10 - 13 kW inductive shrink fit machines",
      "Heating Time": "Approximately 5 - 8 seconds",
      "Cooling Time": "30 - 45 seconds on liquid/air cooling contact bell",
      "Tool Shank Tolerance Required": "ISO h6 strictly required (carbide or HSS)"
    },
    certifications: "ISO 9001:2015, Laser Dynamic Balance Certificate Enclosed."
  },

  "KP-TH-BT30-SF06-80": {
    sku: "KP-TH-BT30-SF06-80",
    name: "BT30 Shrink Fit Tool Holder Ø6.0mm (Gauge Length 80mm)",
    category: "Tool Holding",
    categorySlug: "toolholding",
    categoryUrl: "tool-holding.html",
    badge: "Ultra-High RPM (30k)",
    image: "assets/images/diagrams/tool-holding.svg",
    shortDesc: "Compact thermal shrink chuck for high-speed BT30 machining centers (Fanuc Robodrill, Brother Speedio) balanced up to 30,000 RPM.",
    purpose: "High-speed tapping centers and micro-milling in semiconductor parts, electronics housings, and medical components.",
    workpieceMaterials: ["BT30 Spindles"],
    keyFeatures: ["Balanced to G2.5 @ 30,000 RPM", "Nose diameter only 17mm", "Zero moving parts prevents centrifugal unbalance"],
    specs: {
      "Spindle Taper": "BT30",
      "Bore Diameter": "Ø6.0 mm (h6)",
      "Gauge Length": "80 mm",
      "Runout": "≤ 0.003 mm",
      "Balance": "G2.5 @ 30,000 RPM"
    },
    operatingConditions: { "Max Speed": "30,000 RPM", "Coolant": "Form AD" },
    certifications: "ISO 9001:2015."
  },

  "KP-TH-BT40-SF16-100": {
    sku: "KP-TH-BT40-SF16-100",
    name: "BT40 Shrink Fit Tool Holder Ø16mm (Gauge Length 100mm)",
    category: "Tool Holding",
    categorySlug: "toolholding",
    categoryUrl: "tool-holding.html",
    badge: "Heavy Duty Thermal",
    image: "assets/images/diagrams/tool-holding.svg",
    shortDesc: "Rigid thermal shrink holder for heavy roughing and dynamic milling with large carbide end mills.",
    purpose: "Heavy stock removal in mold cavities, automotive stamping dies, and structural steel components.",
    workpieceMaterials: ["BT40 Spindles"],
    keyFeatures: ["Massive gripping torque > 500 Nm", "Runout ≤ 0.003mm", "Extends carbide tool life significantly"],
    specs: {
      "Spindle Taper": "BT40",
      "Bore": "Ø16.0 mm (h6)",
      "Gauge Length": "100 mm",
      "Balance": "G2.5 @ 25,000 RPM",
      "Runout": "≤ 0.003 mm"
    },
    operatingConditions: { "Max Speed": "25,000 RPM" },
    certifications: "ISO 9001:2015."
  },

  "KP-TH-HSK63-HC20-100": {
    sku: "KP-TH-HSK63-HC20-100",
    name: "HSK-A63 Hydraulic Expansion Chuck Ø20mm (L=100mm)",
    category: "Tool Holding",
    categorySlug: "toolholding",
    categoryUrl: "tool-holding.html",
    badge: "Hydraulic Vibration Damping",
    image: "assets/images/diagrams/tool-holding.svg",
    shortDesc: "High-damping hydraulic chuck for reaming, finish milling, and micro-mirror finishing on HSK-A63 spindles.",
    purpose: "Internal oil chamber absorbs machining micro-vibrations, preventing chatter on long-overhang tools and delivering mirror finishes (Ra < 0.1µm).",
    workpieceMaterials: ["HSK-A63 DIN 69893 Spindles"],
    keyFeatures: [
      "2.5x higher vibration damping than mechanical collet chucks.",
      "Quick 10-second tool change using a single Allen T-wrench.",
      "Compatible with reduction sleeves from Ø20mm down to Ø3mm, Ø4mm, Ø6mm, Ø8mm, Ø12mm."
    ],
    specs: {
      "Spindle Interface": "HSK-A63 (DIN 69893)",
      "Direct Clamping Bore": "Ø20.0 mm (H6)",
      "Gauge Length": "100 mm",
      "Runout Accuracy": "≤ 0.003 mm TIR at 2.5xD",
      "Balance": "G2.5 @ 25,000 RPM",
      "Actuation": "Radial Pressure Piston with Safety Stop"
    },
    operatingConditions: {
      "Max Speed": "25,000 RPM",
      "Clamping Torque": "Up to 400 Nm (Ø20mm)",
      "Max Operating Temp": "50°C continuous"
    },
    certifications: "ISO 9001:2015, CMM Metrology Certificate."
  },

  "KP-TH-BT40-ER32-70": {
    sku: "KP-TH-BT40-ER32-70",
    name: "BT40 Ultra-Precision ER32 Collet Chuck (L=70mm)",
    category: "Tool Holding",
    categorySlug: "toolholding",
    categoryUrl: "tool-holding.html",
    badge: "Versatile Collet System",
    image: "assets/images/diagrams/tool-holding.svg",
    shortDesc: "Short, rigid BT40 ER32 collet chuck with ball-bearing clamping nut for high-feed drilling, tapping, and general milling.",
    purpose: "Universal shop floor tooling for drilling, reaming, tap holders, and general milling operations.",
    workpieceMaterials: ["BT40 Spindles"],
    keyFeatures: ["Short projection L=70mm maximizes rigidity", "Special anti-friction nut coating prevents collet twist", "TIR ≤ 0.005mm with UP collets"],
    specs: {
      "Spindle Taper": "BT40",
      "Collet Series": "ER32 (DIN 6499B)",
      "Clamping Range": "Ø2.0 mm to Ø20.0 mm",
      "Gauge Length": "70 mm",
      "Balance": "G2.5 @ 20,000 RPM"
    },
    operatingConditions: { "Recommended Tightening Torque": "170 Nm for ER32" },
    certifications: "ISO 9001:2015."
  },

  "KP-TH-ER32-UP-SET": {
    sku: "KP-TH-ER32-UP-SET",
    name: "ER32 Ultra-Precision Spring Collet Set (18 pcs, 3 - 20mm)",
    category: "Tool Holding",
    categorySlug: "toolholding",
    categoryUrl: "tool-holding.html",
    badge: "TIR ≤ 0.005mm (UP Grade)",
    image: "assets/images/diagrams/tool-holding.svg",
    shortDesc: "Complete set of 18 ultra-precision ground spring collets from 3mm to 20mm with sub-micron concentricity inspection.",
    purpose: "Precision clamping of drills, reamers, and end mills across toolroom and production CNC centers.",
    workpieceMaterials: ["Fits all standard ER32 collet chucks"],
    keyFeatures: ["Ultra-Precision grade (UP) runout ≤ 0.005mm", "Cryogenically treated spring steel", "Includes wooden fitted storage chest"],
    specs: {
      "Standard": "DIN 6499B",
      "Quantity": "18 pieces (Ø3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 mm)",
      "Runout": "≤ 0.005 mm (5 microns)",
      "Collapse Range": "1.0 mm per collet"
    },
    operatingConditions: { "Cleaning": "Always wipe clean before insertion into nut" },
    certifications: "ISO 9001:2015, 100% Runout Verified."
  },

  "KP-TH-PULLSTUD-BT40": {
    sku: "KP-TH-PULLSTUD-BT40",
    name: "BT40 45° High-Pressure Coolant Pull Stud Retention Knob",
    category: "Tool Holding",
    categorySlug: "toolholding",
    categoryUrl: "tool-holding.html",
    badge: "Retention Knob JIS 40P",
    image: "assets/images/diagrams/tool-holding.svg",
    shortDesc: "Precision ground retention knob for BT40 tool holders with central through-coolant hole and dual O-ring seal.",
    purpose: "Locks the BT40 toolholder into the CNC machine drawbar gripper with zero taper distortion.",
    workpieceMaterials: ["BT40 Spindles with 45° Gripper Balls"],
    keyFeatures: ["High-grade alloy steel case-hardened to HRC 58-60", "Through-bore for high-pressure coolant up to 70 Bar", "Rolled M16 threads for maximum fatigue life"],
    specs: {
      "Standard": "JIS B6339 40P (45° Head Angle)",
      "Thread": "M16 x 2.0P",
      "Through Hole": "Ø4.0 mm Coolant-Thru",
      "Hardness": "HRC 58 - 60 (Core HRC 35-40)"
    },
    operatingConditions: { "Tightening Torque": "80 - 90 Nm" },
    certifications: "ISO 9001:2015, Magnetic Particle Crack Inspected."
  },

  // ==========================================
  // 4. EDM WIRES & ACCESSORIES
  // ==========================================
  "KP-EDM-BR25-P5": {
    sku: "KP-EDM-BR25-P5",
    name: "High-Tensile Precision Brass EDM Wire Ø0.25mm (5kg Spool)",
    category: "EDM Wires",
    categorySlug: "edm",
    categoryUrl: "edm-wires.html",
    badge: "CuZn35 980 N/mm²",
    image: "assets/images/diagrams/edm-wire.svg",
    shortDesc: "Ultra-straight premium CuZn35 brass EDM wire formulated for 100% reliable Automatic Wire Threading (AWT) and consistent spark discharge.",
    purpose: "High-precision Wire EDM cutting of press tool dies, plastic mold cavities, tungsten carbide punches, and aerospace components.",
    workpieceMaterials: [
      "Hardened Steels: SKD11, DC53, D2, H13 (up to 65 HRC)",
      "Tungsten Carbide grades (G2, G5, Micro-grain)",
      "Titanium Alloys (Ti-6Al-4V)",
      "Inconel, Monel & Hastelloy superalloys"
    ],
    keyFeatures: [
      "Continuous in-line annealing eliminates wire curling and ensures zero-jam auto wire threading into submerged jets.",
      "High tensile strength (980 - 1000 N/mm²) prevents wire vibration and maintains tight corner radii.",
      "Paraffin-free, ultra-clean surface prevents copper dust deposition in diamond guides and power contacts.",
      "Uniform diameter tolerance within ±0.001 mm ensures predictable electrical discharge gap."
    ],
    specs: {
      "Nominal Diameter": "Ø0.25 mm (±0.001 mm)",
      "Alloy Composition": "CuZn35 (Copper 65%, Zinc 35% virgin raw materials)",
      "Tensile Strength": "980 - 1000 N/mm²",
      "Elongation": "1.5% - 2.5%",
      "Electrical Conductivity": "20% - 22% IACS",
      "Surface Condition": "Bright, clean, micro-paraffined for smooth feed",
      "Spool Standard": "DIN 125 (P5 - 5 kg net wire weight)",
      "Wire Length per Spool": "Approx. 12,000 meters"
    },
    operatingConditions: {
      "Machine Compatibility": "Sodick, Mitsubishi, GF AgieCharmilles, Fanuc Robocut, Makino, Seibu, Accutex",
      "Recommended Dielectric": "Deionized water (Resistivity 10 - 15 MΩ·cm)",
      "Wire Tension": "1000 - 1400 grams (depending on workpiece height)",
      "Flushing Pressure": "High pressure (0.8 - 1.5 MPa) for roughing"
    },
    certifications: "ISO 9001:2015, RoHS Compliant, Tensile Curve Logged."
  },

  "KP-EDM-BR20-P5": {
    sku: "KP-EDM-BR20-P5",
    name: "High-Tensile Precision Brass EDM Wire Ø0.20mm (5kg Spool)",
    category: "EDM Wires",
    categorySlug: "edm",
    categoryUrl: "edm-wires.html",
    badge: "Fine Pitch CuZn35",
    image: "assets/images/diagrams/edm-wire.svg",
    shortDesc: "Fine diameter 0.20mm brass wire for micro-radius corners, stamping dies, and thin slotting.",
    purpose: "Fine-pitch gear dies, connector mold cavities, and small corner radii (R < 0.12mm).",
    workpieceMaterials: ["Hardened steels", "Tungsten carbide", "Titanium"],
    keyFeatures: ["High tensile 1000 N/mm² avoids breaks in thin diameters", "Superior straightness for AWT", "Smooth discharge"],
    specs: {
      "Diameter": "Ø0.20 mm (±0.001mm)",
      "Alloy": "CuZn35",
      "Tensile": "1000 N/mm²",
      "Spool": "P5 (5 kg net weight)"
    },
    operatingConditions: { "Tension": "800 - 1100 g" },
    certifications: "ISO 9001:2015."
  },

  "KP-EDM-BR25-P10": {
    sku: "KP-EDM-BR25-P10",
    name: "High-Tensile Precision Brass EDM Wire Ø0.25mm (10kg Spool)",
    category: "EDM Wires",
    categorySlug: "edm",
    categoryUrl: "edm-wires.html",
    badge: "Unattended Lights-Out 10kg",
    image: "assets/images/diagrams/edm-wire.svg",
    shortDesc: "Large capacity 10kg spool providing over 24,000 meters of continuous wire for unattended overnight weekend shifts.",
    purpose: "High-volume production runs and tall workpiece cuts requiring long, uninterrupted machine hours.",
    workpieceMaterials: ["All WEDM materials"],
    keyFeatures: ["10kg high-capacity spool fits modern large machines", "Reduces spool change downtime by 50%", "Constant tension throughout spool"],
    specs: {
      "Diameter": "Ø0.25 mm",
      "Tensile": "980 N/mm²",
      "Spool": "P10 (DIN 160, 10 kg net)",
      "Wire Length": "Approx. 24,000 meters"
    },
    operatingConditions: { "Fits": "Machines with 10kg/16kg spool holders" },
    certifications: "ISO 9001:2015."
  },

  "KP-EDM-ZN25-DIFF": {
    sku: "KP-EDM-ZN25-DIFF",
    name: "Gamma-Phase Zinc Coated High-Speed EDM Wire Ø0.25mm",
    category: "EDM Wires",
    categorySlug: "edm",
    categoryUrl: "edm-wires.html",
    badge: "Speed Boost (+25%)",
    image: "assets/images/diagrams/edm-wire.svg",
    shortDesc: "Diffusion-annealed gamma zinc layer wire delivering up to 25% faster cutting speeds and mirror surface finish on tall mold blocks.",
    purpose: "High-productivity mold & die shops where cutting speed and surface roughness are critical to reduce polishing times.",
    workpieceMaterials: ["Tall block mold steels (H13, P20, SKD61)", "Large stamping dies", "Inconel aerospace components"],
    keyFeatures: [
      "Gamma-phase zinc coating has lower evaporation temp, creating stronger flushing pressure that purges recast sludge.",
      "Increases cutting speed by 20% to 30% compared to standard plain brass.",
      "Yields superior surface finishes (Ra < 0.2µm) and minimal recast layer thickness."
    ],
    specs: {
      "Diameter": "Ø0.25 mm (±0.001mm)",
      "Core": "CuZn20 Low-Zinc Brass Core (high electrical conductivity)",
      "Coating": "Thermally diffused Gamma Zinc outer layer",
      "Tensile Strength": "900 N/mm²",
      "Spool": "DIN 200 (8 kg net)"
    },
    operatingConditions: {
      "Speed Advantage": "Run machine generator on zinc-coated wire technology parameters",
      "Flushing": "Ensure optimal nozzle sealing against workpiece"
    },
    certifications: "ISO 9001:2015, European Quality Standards."
  },

  "KP-EDM-CONTACT-TC": {
    sku: "KP-EDM-CONTACT-TC",
    name: "Tungsten Carbide Power Feed Contacts (Pack of 4 pcs)",
    category: "EDM Wires",
    categorySlug: "edm",
    categoryUrl: "edm-wires.html",
    badge: "High Wear Resistance",
    image: "assets/images/diagrams/edm-wire.svg",
    shortDesc: "Ultra-fine grain tungsten carbide electrical power feed contacts for upper and lower heads on wire EDM machines.",
    purpose: "Transfers high-frequency pulse electrical discharge currents to the moving wire with minimal electrical erosion.",
    workpieceMaterials: ["Compatible with Mitsubishi, Sodick, Fanuc, GF Machining"],
    keyFeatures: ["Special cobalt-free composite carbide", "Extremely low electrical contact resistance", "Reversible multi-position indexing"],
    specs: {
      "Material": "Ultra-Dense Tungsten Carbide composite",
      "Quantity": "4 pieces per set",
      "Lifespan": "Over 500 hours per indexing position",
      "Surface Finish": "Mirror polished wire track"
    },
    operatingConditions: { "Maintenance": "Index contact position every 80 - 100 hours of cutting" },
    certifications: "ISO 9001:2015."
  },

  // ==========================================
  // 5. OTHERS & WORKSHOP CONSUMABLES
  // ==========================================
  "KP-EDM-FIL-340": {
    sku: "KP-EDM-FIL-340",
    name: "High-Efficiency Sub-Micron EDM Water Filter (3-5µm)",
    category: "Others & Consumables",
    categorySlug: "others",
    categoryUrl: "others.html",
    badge: "Filtration 3-5µm",
    image: "assets/images/diagrams/edm-wire.svg",
    shortDesc: "Dual-pleated synthetic media high-pressure filter cartridge compatible with Sodick, Mitsubishi, GF Machining, and Fanuc wire EDM systems.",
    purpose: "Removes fine sub-micron electrical discharge erosion sludge from dielectric water, protecting diamond guides and stabilizing electrical conductivity.",
    workpieceMaterials: ["Dielectric water systems for Wire EDM and Sinker EDM"],
    keyFeatures: [
      "Dual-layer synthetic pleated media captures sludge particles down to 3 - 5 microns.",
      "High collapse-resistance steel inner core withstands pump pressures up to 3.0 Bar without rupture.",
      "Extends deionization resin lifespan by preventing resin fouling from metal micro-debris."
    ],
    specs: {
      "Outer Diameter": "340 mm",
      "Height": "300 mm",
      "Connection Style": "Center Nipple (External Thread) or Central Hole",
      "Filtration Rating": "3 - 5 Microns Nominal",
      "Flow Direction": "Outside-to-Inside Flow",
      "Operating Pressure": "Up to 3.0 Bar (43 PSI)",
      "Lifespan": "250 - 350 operating hours"
    },
    operatingConditions: {
      "Compatibility": "Sodick, Mitsubishi, Fanuc, GF AgieCharmilles, Makino",
      "Replacement Trigger": "Replace when filter pressure gauge enters red zone (> 2.0 Bar)"
    },
    certifications: "ISO 9001:2015 Quality Tested."
  },

  "KP-EDM-RESIN-25L": {
    sku: "KP-EDM-RESIN-25L",
    name: "Virgin Nuclear-Grade Mixed-Bed Deionizing Resin (25L Drum)",
    category: "Others & Consumables",
    categorySlug: "others",
    categoryUrl: "others.html",
    badge: "18 MΩ·cm Nuclear Grade",
    image: "assets/images/diagrams/precision-lab.svg",
    shortDesc: "Premium mixed-bed ion exchange resin for rapidly reducing dielectric water conductivity and maintaining 15 - 18 MΩ·cm water purity.",
    purpose: "Demineralizes tap and RO water for CNC wire EDM machines, preventing secondary parasitic discharge and ensuring razor-sharp cutting kerfs.",
    workpieceMaterials: ["All Wire EDM dielectric water circuits"],
    keyFeatures: [
      "High chemical capacity 1:1 chemical equivalent ratio of strong acid cation and strong base anion.",
      "Rapidly brings raw water down to target resistivity (0.1µS/cm / 15-18 MΩ·cm) within minutes.",
      "Hermetically sealed in 25-liter moisture-barrier poly drums to prevent atmospheric exhaustion."
    ],
    specs: {
      "Resin Type": "Virgin Mixed-Bed Ion Exchange Resin (Non-regenerated)",
      "Matrix Structure": "Gel-type polystyrene crosslinked with divinylbenzene (DVB)",
      "Ionic Form": "H+ / OH- fully activated",
      "Particle Size": "0.3 - 1.2 mm uniform spherical beads",
      "Water Purity Output": "Resistivity > 18.0 MΩ·cm",
      "Packaging": "25 Liters (approx. 18 kg) in sealed drum"
    },
    operatingConditions: {
      "Max Operating Temp": "60°C",
      "Flow Velocity": "20 - 40 Bed Volumes per hour",
      "Storage": "Store between 5°C and 40°C away from direct sunlight"
    },
    certifications: "ISO 9001:2015, Nuclear Grade Purity Standard."
  },

  "KP-FIN-DP-SYR5": {
    sku: "KP-FIN-DP-SYR5",
    name: "Precision Monocrystalline Diamond Lapping Paste Set (5 Syringes)",
    category: "Others & Consumables",
    categorySlug: "others",
    categoryUrl: "others.html",
    badge: "Optical Mirror Polish",
    image: "assets/images/diagrams/precision-lab.svg",
    shortDesc: "Calibrated monocrystalline diamond compound set (0.5µm, 1µm, 3µm, 6µm, 9µm) in 5g dosing syringes for mold cavity mirror polishing.",
    purpose: "Precision hand and rotary polishing of plastic injection mold cavities, optical dies, carbide drawing dies, and metrology gauge blocks.",
    workpieceMaterials: ["Hardened Mold Steels (Stavax, NAK80, H13)", "Tungsten Carbide", "Technical Ceramics", "Titanium & Stainless"],
    keyFeatures: [
      "Uniform blocky monocrystalline diamond grains ensure zero stray scratch lines on mirror finishes.",
      "Water/oil soluble synthetic base spreads evenly and cleans off effortlessly with ultrasonic cleaners.",
      "Calibrated 5g syringe dispenser prevents contamination and eliminates material wastage."
    ],
    specs: {
      "Included Micron Grades": "0.5µm (Final Mirror), 1.0µm (Super Finish), 3.0µm (Fine Lapping), 6.0µm (Pre-Polish), 9.0µm (Rapid Stock Removal)",
      "Carrier Base": "Water and Alcohol Soluble Synthetic Gel",
      "Quantity": "5 Syringes x 5 grams each (25g total)",
      "Color Coded": "Grey (0.5µ), White (1µ), Yellow (3µ), Orange (6µ), Green (9µ)",
      "Achievable Roughness": "Ra < 0.02 µm (Mirror Class #14)"
    },
    operatingConditions: {
      "Lap Materials": "Hard felt bobs, copper laps, cast iron plates, wooden sticks",
      "Cleaning": "Clean part thoroughly between grit transitions with alcohol or ultrasonic bath"
    },
    certifications: "ISO 9001:2015, Micro-Screened Mesh Guarantee."
  },

  "KP-ACC-CLEAN-5L": {
    sku: "KP-ACC-CLEAN-5L",
    name: "Dielectric Tank & Ultrasonic Machine Cleaner Concentrate (5L)",
    category: "Others & Consumables",
    categorySlug: "others",
    categoryUrl: "others.html",
    badge: "Eco Sludge Dissolver",
    image: "assets/images/diagrams/precision-lab.svg",
    shortDesc: "Non-corrosive chemical agent for dissolving hardened EDM sludge, rust deposits, and scale from dielectric tanks and machine way covers.",
    purpose: "Routine maintenance and deep cleaning of CNC EDM work tanks, pump circuits, chiller units, and CNC way guards.",
    workpieceMaterials: ["Machine worktanks, ceramic plates, stainless guards"],
    keyFeatures: ["Phosphorus-free eco-friendly formula", "Dissolves stubborn copper-iron sludge without etching stainless", "5-liter concentrated container"],
    specs: {
      "Volume": "5.0 Liters Concentrate",
      "Dilution Ratio": "1:5 with water for heavy sludge, 1:15 for general wiping",
      "pH": "Neutral (6.8 - 7.2 non-acidic)"
    },
    operatingConditions: { "Application": "Spray onto tank walls, soak for 10 minutes, rinse with clean water" },
    certifications: "RoHS Compliant, Biodegradable."
  },

  "KP-ACC-RUST-SP": {
    sku: "KP-ACC-RUST-SP",
    name: "Industrial Moisture-Displacing Anti-Corrosion Spray (400ml)",
    category: "Others & Consumables",
    categorySlug: "others",
    categoryUrl: "others.html",
    badge: "Long-Term Protection",
    image: "assets/images/diagrams/precision-lab.svg",
    shortDesc: "High-performance moisture displacing corrosion inhibitor for precision tooling, machined parts, and CNC chucks.",
    purpose: "Protects freshly machined steel parts, EDM workpieces, and toolholders from atmospheric oxidation during storage and transit.",
    workpieceMaterials: ["All ferrous steels, cast irons, mold cavities"],
    keyFeatures: ["Displaces moisture instantly", "Forms an ultra-thin dry non-greasy protective film", "Protects against rust for up to 12 months indoors"],
    specs: {
      "Packaging": "400 ml Aerosol Can",
      "Film Thickness": "1.5 - 2.5 µm (does not alter precision tolerances)",
      "Salt Spray Test": "Over 72 hours ASTM B117"
    },
    operatingConditions: { "Removal": "Easily removed with standard degreaser or solvent wipe" },
    certifications: "ISO 9001:2015."
  }
};

// Export to global window and module.exports
if (typeof window !== 'undefined') {
  window.KP_PRODUCTS = KP_PRODUCTS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { KP_PRODUCTS };
}
