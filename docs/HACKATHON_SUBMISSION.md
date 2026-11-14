# NASA SPACE APPS CHALLENGE 2026 — OFFICIAL SUBMISSION DOSSIER

## Challenge: Interplanetary Survival Guide: Martian Map
## Project Title: ARES — Advanced Martian Exploration & Survival System

---

### 1. Project Title & Concise Summary
**Project Title:** ARES — Advanced Martian Exploration & Survival System  
**Tagline:** A Multi-Mission Planetary Information System and Science–Safety Route Optimizer for Astronaut Marswalks.

**Concise Summary (150 words):**  
ARES is an intelligent, full-stack Martian mission-planning and survival platform designed to guide future astronauts across the surface of Mars. Rather than treating Mars as a static satellite map, ARES integrates verified data from seven distinct NASA and USGS planetary missions—including MGS MOLA altimetry, 2001 Mars Odyssey THEMIS infrared, Viking MDIM 2.1 visible mosaics, USGS SIM 3292 geologic maps, Mars 2020 MEDA in-situ atmospheric telemetry, and MSL Curiosity RAD dosimetric records.

ARES's core innovation is its **Science–Safety Route Optimizer**: an explainable, multi-objective $A^*$ pathfinding engine operating over 2.5D numerical elevation cost grids. It dynamically evaluates slope stability, surface roughness, life-support metabolic consumption (NASA-STD-3001), and astrobiological sampling value. Astronauts can generate, compare, and export Pareto-optimal traverse flight plans tailored for either maximum hazard evasion or high-value science harvesting.

---

### 2. Detailed Problem Statement & Solution Description

#### The Problem
As NASA prepares for human missions to Mars in the 2030s under the Moon-to-Mars architecture, crewed Extravehicular Activities (EVAs) will present life-critical challenges:
1. **Dynamic Traversability & Tip Hazards:** Pressurized EVA suits have a dynamic stability limit of approximately $22^\circ$ slope before slip and fall hazards become catastrophic. Standard visual maps provide no quantitative slopes or roughness indicators.
2. **Resource Margins (O2 & Power):** Steep ascents dramatically increase astronaut metabolic rates (from baseline ~120 W up to >500 W), consuming life-support oxygen up to 2.5× faster.
3. **Data Fragmentation:** Critical scientific data (hydrated minerals, potential water ice, crater stratigraphy, and atmospheric radiation) resides in disparate PDS archives with varying coordinates, projections, and processing levels.
4. **Subjective Route Planning:** Human planners often pick straight-line paths or manual detours without quantitative optimization against life-support margins and sample return opportunities.

#### The ARES Solution
ARES provides a unified, interactive planetary GIS mission control interface:
- **True Planetary Projection:** Renders Mars in its authentic Equirectangular Plate Carrée (EPSG:4326) reference frame using OpenLayers, eliminating Earth-Mercator distortions.
- **Numerical Altimetry Grid:** Samples MOLA MEGDR gridded altimetry (meters relative to Mars Areoid datum) to calculate exact slope vectors ($\nabla z$) and roughness indexes.
- **Science–Safety Pareto Routing:** Computes three distinct strategy corridors (*Safe Passage*, *Scientific Odyssey*, and *Balanced Expedition*) with full explainability scores.
- **Real-Time Environmental HUD:** Directly displays in-situ MEDA and REMS/RAD observations (surface temperature, atmospheric pressure tides, dust opacity $\tau$, and galactic cosmic ray dose rates).
- **Official NASA Image Integration:** Connects to `images-api.nasa.gov` for ground-truth rover imagery.

---

### 3. Innovation & Uniqueness Explanation

What makes ARES unique compared to existing planetary visualizations:

1. **Explainable Multi-Objective Pathfinding:**  
   Most mapping tools either display pre-drawn rover tracks or simple Euclidean distance lines. ARES calculates actual 2.5D topographic traversal cost grids where slope gradient, roughness, terrain uncertainty, and astrobiological potential are mathematically weighted.
2. **Strict Scientific Rule — No Slopes from Imagery:**  
   ARES never estimates elevation or slope from optical color ramps. All terrain metrics are mathematically derived from peer-reviewed MOLA laser altimetry grids with known spatial resolutions.
3. **NASA-STD-3001 Metabolic Modeling:**  
   Traverse duration and oxygen expenditures are computed using biomechanical models of pressurized locomotion in Martian 0.376g surface gravity, accounting for suit joint stiffness, astronaut mass, and incline grade.
4. **Data Confidence Penalization:**  
   Unknown or low-resolution terrain is never defaulted to "safe." Missing data carries a mathematical penalty that forces the pathfinder around unverified sectors unless explicitly prioritized.

---

### 4. NASA Data Integration Explanation

ARES directly integrates verified data representing **seven distinct NASA and USGS planetary science missions**:

| Dataset | Mission / Source | Role in Application |
| :--- | :--- | :--- |
| **MGS MOLA MEGDR** | Mars Global Surveyor (NASA/GSFC) | Numerical datum elevations, slope gradient vectors, and roughness calculations |
| **2001 Mars Odyssey THEMIS IR** | NASA/ASU Mars Odyssey Mission | Daytime infrared mosaic for thermal inertia and rock abundance visualization |
| **Viking MDIM 2.1** | Viking Orbiters 1 & 2 (NASA/USGS) | Photometrically controlled global optical visible mosaic |
| **USGS SIM 3292** | Tanaka et al. (2014) USGS Astrogeology | Chronostratigraphic geologic classification (Noachian, Hesperian, Amazonian) |
| **Mars 2020 MEDA** | Perseverance Rover (NASA/JPL) | Diurnal temperature curves, atmospheric pressure, dust tau ($\tau$), and wind speed |
| **MSL RAD** | Curiosity Rover (NASA/JPL/SwRI) | Surface ionizing radiation dose rates (mGy/day) and safe EVA duration constraints |
| **MRO SHARAD** | Mars Reconnaissance Orbiter (NASA/ASI) | Subsurface pure water-ice detections and dielectric permittivity maps |
| **NASA Image & Video Library** | NASA Open Data API (`images-api.nasa.gov`) | Live queries for authentic rover images, SuperCam spectra, and photojournal archives |

---

### 5. Technical Architecture Description

ARES is architected as a modern, Vercel-ready Next.js 14 full-stack platform:
- **Frontend Architecture:** Next.js App Router with React 18, Tailwind CSS, OpenLayers 10 for planetary GIS rendering, and Recharts for scientific elevation and diurnal atmospheric curves.
- **Serverless API Layer:** Modular Next.js serverless functions (`/api/terrain/*`, `/api/route/*`, `/api/environmental`, `/api/nasa/*`, `/api/reports/*`, `/api/datasets`) validated via **Zod schemas**.
- **Geospatial Engine:** Pure TypeScript computational engine (`lib/engine/`) implementing Great-Circle Haversine spherical math ($R_{Mars} = 3,389.5\text{ km}$), MOLA bilinear elevation sampling, and multi-objective $A^*$ graph search.
- **Deployment Pipeline:** GitHub-native continuous integration and deployment with zero persistent background process dependencies, making it universally accessible via standard web browsers on desktop, tablet, and mobile.

---

### 6. Scientific Validity & Impact Explanation

#### Astronaut Safety
Pressurized space suits restrict astronaut field of view and mobility. Falling on jagged volcanic basalt or sliding down an unstable $25^\circ$ talus slope can puncture suit pressure bladders, resulting in rapid depressurization. ARES prevents catastrophic incidents by enforcing quantitative slope thresholds and warning astronauts of terrain instability miles in advance.

#### Scientific Return
During an 8-hour EVA, astronauts must maximize the astrobiological value of returned samples. By identifying contacts between smectite clay bottomsets and sulfate evaporites (e.g., Jezero Skinner Ridge and Wildcat Ridge), ARES ensures that the highest-yield biosignature candidate lithologies are prioritized without exceeding life-support margins.

#### Transparency & Uncertainty
ARES explicitly separates direct in-situ rover measurements (such as MEDA air temperature at 1.45m height) from calibrated historical climate baselines and general circulation models (GCMs). Every dataset displays its spatial resolution, coordinate system, product ID, and known limitations.

---

### 7. Realistic Demonstration Scenario

**Scenario:** *ARES-1 Crewed Expedition to Jezero Crater (Neretva Vallis Delta)*  
**Date:** Mars Sol 1326 | Local True Solar Time: 13:45 LTST | Solar Longitude: $L_s = 84^\circ$

1. **Sector Briefing:** Commander opens ARES Mission Control. The 3D Mars globe aligns with Jezero Crater ($18.4447^\circ\text{N}, 77.4508^\circ\text{E}$, elevation $-2,560\text{ m}$).
2. **Atmospheric Clearance:** Environmental HUD indicates nominal atmospheric conditions: Air temp $-42^\circ\text{C}$ (midday peak), surface pressure $735\text{ Pa}$, clear dust optical depth $\tau = 0.42$, and GCR radiation dose $0.64\text{ mGy/day}$ with an allowable single-EVA window of $15.6\text{ hours}$.
3. **Route Planning:** Crew designates the EVA Departure Depot at Octavia E. Butler landing base ($18.380^\circ\text{N}, 77.580^\circ\text{E}$) and objective at the Upper Delta Scarp ($18.460^\circ\text{N}, 77.410^\circ\text{E}$).
4. **Science–Safety Optimizer Evaluation:**
   - *Safe Passage:* Length $11.4\text{ km}$, Max slope $6.4^\circ$, Safety Index 94/100, O2 consumption $98\text{ L}$.
   - *Scientific Odyssey:* Length $12.8\text{ km}$, Max slope $18.2^\circ$, Science Score 96/100, visits Kodiak Butte and Skinner Ridge mudstones, O2 consumption $142\text{ L}$.
   - *Balanced Expedition (Recommended):* Length $10.9\text{ km}$, Max slope $11.1^\circ$, Overall Score 89/100, visits Wildcat Ridge hydrated sulfates, O2 consumption $114\text{ L}$ (well within the $300\text{ L}$ EMU reserve).
5. **Execution & Flight Plan Export:** Commander reviews the Recharts elevation profile, verifies nominal slope hazard exposure ($78\%$ nominal, $22\%$ caution), activates the Balanced Traverse, and exports the official GeoJSON and printable mission briefing.

---

### 8. Presentation Slide Content & Structure

- **Slide 1: Title & Challenge:** ARES — Advanced Martian Exploration & Survival System (NASA Space Apps 2026).
- **Slide 2: The Human Marswalk Problem:** High slopes ($>22^\circ$), severe metabolic oxygen spikes, and fragmented orbital science data.
- **Slide 3: Multi-Mission Data Fusion:** Integrating 7 NASA & USGS missions (MOLA, THEMIS, Viking, USGS SIM 3292, MEDA, REMS, RAD).
- **Slide 4: Core Innovation — Science–Safety Route Optimizer:** $A^*$ pathfinding over 2.5D topographic grids balancing terrain safety, discovery yield, and oxygen margins.
- **Slide 5: Planetary GIS & Real MOLA Topography:** OpenLayers Equirectangular cartography with quantitative slope and roughness modeling.
- **Slide 6: Environmental Intelligence & In-Situ Provenance:** MEDA atmospheric diurnal cycles, dust $\tau$, and Curiosity RAD cosmic ray dose monitoring.
- **Slide 7: Demonstration Case Study:** Jezero Crater Western Delta traverse (Perseverance site).
- **Slide 8: Technical Architecture & Vercel Serverless Stack:** Next.js 14, TypeScript, OpenLayers, Zod validation, zero server daemons.
- **Slide 9: Impact & Astrobiological Future:** Empowering Artemis and Mars human exploration with explainable autonomy.

---

### 9. Short Video / Demonstration Script (2 Minutes)

- **[0:00 - 0:20] Hook:** *"When humanity steps onto the red surface of Mars, every step will be bounded by razor-thin margins of oxygen, energy, and terrain stability. This is ARES — the Advanced Martian Exploration & Survival System."*
- **[0:20 - 0:45] The Planetary GIS:** *"Built for the NASA Space Apps Challenge, ARES is a complete planetary GIS platform. Here in Jezero Crater, our OpenLayers map streams authentic NASA JPL Mars Trek tiles—switching effortlessly between MOLA color shaded relief, Viking visual mosaics, and THEMIS infrared thermal inertia."*
- **[0:45 - 1:15] The Science-Safety Optimizer:** *"Watch what happens when we plan an astronaut traverse from our EVA base to the delta scarp. ARES doesn't just draw a straight line. Our Science–Safety Route Optimizer calculates a multi-objective $A^*$ search over real MOLA laser altimetry grids. In seconds, it generates three explainable strategies: Safe Passage avoids dangerous crater scarps; Scientific Odyssey diverts to sample ancient clay bottomsets at Skinner Ridge; while Balanced Expedition achieves the optimal equilibrium of safety, discovery, and oxygen reserves."*
- **[1:15 - 1:40] Environmental Intelligence:** *"Our Environmental HUD streams in-situ data calibrated from the Perseverance MEDA and Curiosity RAD instruments—tracking diurnal thermal cycles, atmospheric pressure, and surface cosmic ray radiation dose rates."*
- **[1:40 - 2:00] Conclusion:** *"With one click, astronauts export a NASA-compliant GeoJSON flight plan and mission briefing. ARES transforms disconnected NASA science data into survival intelligence. Developed with Next.js, TypeScript, and OpenLayers, deployed natively on Vercel. ARES: engineered for the explorers of Mars."*

---

### 10. AI-Tool Usage Disclosure

In compliance with NASA Space Apps Challenge 2026 rules:
- **AI Tools Used:** Google Antigravity AI Assistant (Gemini 3.8 Flash / Pro models).
- **Scope of Assistance:** Full-stack TypeScript architecture, OpenLayers GIS integration, mathematical implementation of the $A^*$ cost function and NASA-STD-3001 metabolic equation, UI component styling with Tailwind CSS, and automated QA test suite development.
- **Verification:** All scientific parameters, coordinates, elevations, formulas, and dataset product identifiers were independently verified against official NASA PDS, USGS Astrogeology, and peer-reviewed scientific literature.
- **No Logo Modifications:** No NASA logos, emblems, or mission patches were generated or altered.
