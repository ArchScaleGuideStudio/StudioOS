export const initialMasters = {
  MasterProjectCategory: [
    { id: 1,  value: 'Home Owner',                  family: 'Residential',                        label: 'Home Owners',          ord: 1 },
    { id: 2,  value: 'Developer',                   family: 'Residential',                        label: 'Developers',           ord: 2 },
    { id: 3,  value: 'Offices',                     family: 'Commercial',                         label: 'Offices',              ord: 3 },
    { id: 4,  value: 'Hospitality & Leisure',       family: 'Commercial',                         label: 'Hospitality & Leisure',ord: 4 },
    { id: 5,  value: 'Retail',                      family: 'Commercial',                         label: 'Retail',               ord: 5 },
    { id: 6,  value: 'Health Care',                 family: 'Commercial',                         label: 'Health Care',          ord: 6 },
    { id: 7,  value: 'F&B',                         family: 'Commercial',                         label: 'F&B',                  ord: 7 },
    { id: 8,  value: 'Events & Exhibitions',        family: 'Commercial',                         label: 'Events & Exhibitions', ord: 8 },
    { id: 9,  value: 'Institutional',               family: 'Institutional',                      label: 'Educational',          ord: 9 },
    { id: 10, value: 'Industrial',                  family: 'Industrial',                         label: 'Industrial',           ord: 10 },
    { id: 11, value: 'Civic, Culture & Community',  family: 'Civic, Culture & Community',         label: 'Civic & Cultural',     ord: 11 },
    { id: 12, value: 'Public Utility',              family: 'Public Utility',                     label: 'Public Utility',       ord: 12 },
  ],
  MasterPropertyType: [
    { id: 1, value: 'Flat', category: 'Home Owner' },
    { id: 2, value: 'Villa', category: 'Home Owner' },
    { id: 3, value: 'Luxury Apartment', category: 'Home Owner' },
    { id: 4, value: 'Penthouse', category: 'Home Owner' },
    { id: 5, value: 'Farm Houses', category: 'Home Owner' },
    { id: 6, value: 'High Rise', category: 'Developer' },
    { id: 7, value: 'Corporate HQ/HO', category: 'Offices' },
    { id: 8, value: 'Corporate Regional', category: 'Offices' },
    { id: 9, value: 'SMB Single Floor', category: 'Offices' },
    { id: 10, value: 'SMB Building', category: 'Offices' },
    { id: 11, value: 'Café', category: 'F&B' },
    { id: 12, value: 'QSR', category: 'F&B' },
    { id: 13, value: 'Clinic', category: 'Health Care' },
    { id: 14, value: 'Hospital', category: 'Health Care' },
    { id: 15, value: 'Boutique Showroom', category: 'Retail' },
    { id: 16, value: 'College', category: 'Institutional' },
    { id: 17, value: 'Factory', category: 'Industrial' },
    { id: 18, value: 'Theatres', category: 'Civic, Culture & Community' },
    { id: 19, value: 'Museums', category: 'Civic, Culture & Community' },
    { id: 20, value: 'Memorial', category: 'Civic, Culture & Community' },
    { id: 21, value: 'Religious Spaces', category: 'Civic, Culture & Community' },
    { id: 22, value: 'Airport', category: 'Public Utility' },
    { id: 23, value: 'Railway Stations', category: 'Public Utility' },
    { id: 24, value: 'Metro Stations', category: 'Public Utility' },
    { id: 25, value: 'Landport', category: 'Public Utility' },
    { id: 26, value: 'Sea Port', category: 'Public Utility' },
  ],
  MasterSiteCondition: [
    { id: 1, value: 'Greenfield – Not Built Yet', desc: 'Full design freedom, no physical constraints.' },
    { id: 2, value: 'Under Construction', desc: 'Structure ongoing, changes possible with coordination.' },
    { id: 3, value: 'Bare Shell – Completed', desc: 'Structure fixed, interiors not done.' },
    { id: 4, value: 'Brownfield – Renovation (Layout Changes Possible)', desc: 'Existing space, walls/services can be modified.' },
    { id: 5, value: 'Brownfield – Renovation (Layout Fixed)', desc: 'Existing space, minimal or no layout changes.' },
    { id: 6, value: 'Styling / Furnishing Only', desc: 'No civil work, only furniture, decor, lighting.' },
  ],
  /* Phase 9.1.34 — Site size tiers used during Plan Property Step 3. The size
     selection helps the Planner pre-fill sensible defaults for the spatial
     cascade downstream (e.g. # of levels, # of zones). */
  MasterSiteSize: [
    { id: 1, value: 'Small',       range: 'Under 1,000 sqft',     desc: 'Compact footprint. One level. Few zones.',      ord: 1 },
    { id: 2, value: 'Medium',      range: '1,000 – 3,000 sqft',   desc: 'Typical apartment or small office.',           ord: 2 },
    { id: 3, value: 'Large',       range: '3,000 – 8,000 sqft',   desc: 'Penthouse, villa, or full-floor commercial.',  ord: 3 },
    { id: 4, value: 'Extra Large', range: 'Above 8,000 sqft',     desc: 'Multi-level, multi-zone, complex programme.',  ord: 4 },
  ],
  MasterServiceTypes: [
    { id: 1, value: 'Design + Technical Drawing' },
    { id: 2, value: 'Design + Technical Drawing + Consultation' },
    { id: 3, value: 'Design + Technical Drawing + Consultation + Procurement' },
    { id: 4, value: 'Design + Technical Drawing + Consultation + Construction Administration' },
    { id: 5, value: 'Design + Technical Drawing + Consultation + Project Management' },
    { id: 6, value: 'Design + Build (Turnkey)' },
  ],
  MasterClientFlags: [
    { id: 1, value: 'Slow decision maker' }, { id: 2, value: 'Budget sensitive' },
    { id: 3, value: 'Multiple stakeholders' }, { id: 4, value: 'High urgency' },
    { id: 5, value: 'Scope unclear' }, { id: 6, value: 'Family approval required' },
    { id: 7, value: 'Committee approval' }, { id: 8, value: 'Payment person different' },
  ],
  MasterOnboardingAttentionTags: [
    { id: 1, value: 'Slow decision maker' }, { id: 2, value: 'Budget sensitive' },
    { id: 3, value: 'Multiple stakeholders' }, { id: 4, value: 'High urgency' },
    { id: 5, value: 'Scope unclear' }, { id: 6, value: 'Payment dependency' },
    { id: 7, value: 'Decision delay risk' }, { id: 8, value: 'Site access risk' },
    { id: 9, value: 'Measurement pending' },
  ],
  /* Workflow Stages — now scoped per Service Type. linkedServiceType empty = universal/all. */
  MasterWorkflowStages: [
    /* Universal lifecycle stages (apply to most services) */
    { id: 1,  value: 'Onboarding',          linkedServiceType: '' },
    { id: 2,  value: 'Concept',             linkedServiceType: '' },
    { id: 3,  value: 'Design Development',  linkedServiceType: '' },
    { id: 4,  value: 'Client Approval',     linkedServiceType: '' },
    { id: 5,  value: 'Working Drawings',    linkedServiceType: '' },
    { id: 6,  value: 'BOQ',                 linkedServiceType: '' },
    { id: 7,  value: 'Handover',            linkedServiceType: '' },
    { id: 8,  value: 'Completed',           linkedServiceType: '' },
    /* Stages specific to turnkey / build-included services */
    { id: 9,  value: 'Procurement',         linkedServiceType: 'Design + Build (Turnkey)' },
    { id: 10, value: 'Site Execution',      linkedServiceType: 'Design + Build (Turnkey)' },
    { id: 11, value: 'Snag List',           linkedServiceType: 'Design + Build (Turnkey)' },
    /* Café / fast-track */
    { id: 12, value: 'Procurement',         linkedServiceType: 'Design + Technical Drawing + Consultation + Procurement' },
    /* Construction admin */
    { id: 13, value: 'Construction Administration', linkedServiceType: 'Design + Technical Drawing + Consultation + Construction Administration' },
    /* Project management variant */
    { id: 14, value: 'Phased Site Delivery', linkedServiceType: 'Design + Technical Drawing + Consultation + Project Management' },
  ],

  /* ============================================================
     MasterActivities (Phase 5.4) — Activity is the work-stream inside a stage.
     Each activity carries linkedServiceType + linkedStage for filtering.
     A given activity name (e.g. "Mood Boards") may appear once per service-stage combo.
  ============================================================ */
  MasterActivities: [
    /* Onboarding */
    { id: 1,  value: 'Kickoff & Briefing',          linkedServiceType: '', linkedStage: 'Onboarding',
      description: 'Initial client meeting, scope confirmation, contract signing.' },
    { id: 2,  value: 'Site Survey',                 linkedServiceType: '', linkedStage: 'Onboarding',
      description: 'Physical measurement, photographs, site condition documentation.' },
    { id: 3,  value: 'Design Brief Capture',        linkedServiceType: '', linkedStage: 'Onboarding',
      description: 'Document client preferences, lifestyle, must-haves and constraints.' },
    /* Concept */
    { id: 4,  value: 'Mood Boards',                 linkedServiceType: '', linkedStage: 'Concept',
      description: 'Visual direction — colors, materials, references, feeling.' },
    { id: 5,  value: 'Layout Options',              linkedServiceType: '', linkedStage: 'Concept',
      description: '2-3 alternative floor plans for client review.' },
    { id: 6,  value: 'Material Direction',          linkedServiceType: '', linkedStage: 'Concept',
      description: 'Initial material library — finishes, fabrics, stone, wood samples.' },
    { id: 7,  value: 'Volumetric 3D',               linkedServiceType: '', linkedStage: 'Concept',
      description: 'Quick volumetric renders for spatial feel — not photorealistic.' },
    { id: 8,  value: 'Cost Envelope',               linkedServiceType: '', linkedStage: 'Concept',
      description: 'Order-of-magnitude budget estimate to validate concept feasibility.' },
    /* Design Development */
    { id: 9,  value: 'Detailed Layouts',            linkedServiceType: '', linkedStage: 'Design Development',
      description: 'Final floor plans with all dimensions, fixtures, equipment placement.' },
    { id: 10, value: 'Material Library',            linkedServiceType: '', linkedStage: 'Design Development',
      description: 'Comprehensive specification — every finish, every supplier, every code.' },
    { id: 11, value: 'Photoreal 3D',                linkedServiceType: '', linkedStage: 'Design Development',
      description: 'Photorealistic visualisations of key spaces for client signoff.' },
    { id: 12, value: 'Joinery & Furniture Design',  linkedServiceType: '', linkedStage: 'Design Development',
      description: 'Custom millwork, built-ins, FF&E specifications.' },
    { id: 13, value: 'Lighting Plan',               linkedServiceType: '', linkedStage: 'Design Development',
      description: 'Reflected ceiling plan, fixture selection, switching/control logic.' },
    /* Working Drawings */
    { id: 14, value: 'Architectural Drawings',      linkedServiceType: '', linkedStage: 'Working Drawings',
      description: 'Plans, elevations, sections at 1:50 / 1:25.' },
    { id: 15, value: 'Joinery Detail Drawings',     linkedServiceType: '', linkedStage: 'Working Drawings',
      description: 'Detailed shop drawings for every custom joinery piece.' },
    { id: 16, value: 'MEP Coordination',            linkedServiceType: '', linkedStage: 'Working Drawings',
      description: 'Electrical, plumbing, HVAC coordination drawings.' },
    /* BOQ */
    { id: 17, value: 'Quantity Take-off',           linkedServiceType: '', linkedStage: 'BOQ',
      description: 'Item-by-item quantification from drawings.' },
    { id: 18, value: 'Vendor Quotation',            linkedServiceType: '', linkedStage: 'BOQ',
      description: 'Get quotes from approved vendors for each line item.' },
    { id: 19, value: 'Final Costing',               linkedServiceType: '', linkedStage: 'BOQ',
      description: 'Apply markup, finalise client-facing BOQ document.' },
    /* Procurement (turnkey) */
    { id: 20, value: 'Vendor Selection',            linkedServiceType: 'Design + Build (Turnkey)', linkedStage: 'Procurement',
      description: 'Final vendor shortlisting and PO award.' },
    { id: 21, value: 'PO Issuance & Tracking',      linkedServiceType: 'Design + Build (Turnkey)', linkedStage: 'Procurement',
      description: 'Issue purchase orders and track lead times.' },
    { id: 22, value: 'Sample Approvals',            linkedServiceType: 'Design + Build (Turnkey)', linkedStage: 'Procurement',
      description: 'Physical sample sign-off before bulk order.' },
    /* Site Execution (turnkey) */
    { id: 23, value: 'Civil Works',                 linkedServiceType: 'Design + Build (Turnkey)', linkedStage: 'Site Execution',
      description: 'Demolition, masonry, plastering, structural modifications.' },
    { id: 24, value: 'Joinery Installation',        linkedServiceType: 'Design + Build (Turnkey)', linkedStage: 'Site Execution',
      description: 'Custom millwork installation and finishing.' },
    { id: 25, value: 'Finishes & Painting',         linkedServiceType: 'Design + Build (Turnkey)', linkedStage: 'Site Execution',
      description: 'Wall finishes, flooring, painting.' },
    { id: 26, value: 'MEP Installation',            linkedServiceType: 'Design + Build (Turnkey)', linkedStage: 'Site Execution',
      description: 'Electrical, plumbing, HVAC installation and commissioning.' },
    { id: 27, value: 'FF&E Install & Styling',      linkedServiceType: 'Design + Build (Turnkey)', linkedStage: 'Site Execution',
      description: 'Furniture, fixtures, equipment placement; final styling.' },
    /* Snag List (turnkey) */
    { id: 28, value: 'Snag Walkthrough',            linkedServiceType: 'Design + Build (Turnkey)', linkedStage: 'Snag List',
      description: 'Joint walkthrough with client to log defects.' },
    { id: 29, value: 'Snag Closure',                linkedServiceType: 'Design + Build (Turnkey)', linkedStage: 'Snag List',
      description: 'Fix flagged items and re-inspection.' },
    /* Handover */
    { id: 30, value: 'Documentation Handover',      linkedServiceType: '', linkedStage: 'Handover',
      description: 'Warranty documents, maintenance manuals, vendor contacts.' },
    { id: 31, value: 'Final Photoshoot',            linkedServiceType: '', linkedStage: 'Handover',
      description: 'Professional photography for studio portfolio and client records.' },
  ],

  /* ============================================================
     MasterTasks (Phase 6.2a) — task templates owned by an activity.
     Each row is a reusable task definition. linkedActivity points to the
     activity (by name); when populated, this template carries default
     duration, default checklist, and a default assignee tier.
     This is a CATALOG. It does not auto-populate projects yet —
     project tasks are still created manually until Phase 6.2b/6.3 wires
     workflow templates to clone these into projects.
  ============================================================ */
  MasterTasks: [
    /* Onboarding — Kickoff & Briefing */
    { id: 1,  value: 'Send welcome packet',           linkedActivity: 'Kickoff & Briefing',
      defaultChecklist: 'Compile welcome packet PDF\nVerify portal access works\nEmail to all stakeholders\nLog send confirmation', defaultDurationDays: '2', defaultRoleTier: 'Doer',
      description: 'Email or printed onboarding packet — scope, timelines, key contacts.' },
    { id: 2,  value: 'Schedule kickoff meeting',      linkedActivity: 'Kickoff & Briefing',
      defaultChecklist: 'Find calendar slot for all stakeholders\nBook venue or send video link\nDraft agenda doc\nShare agenda 24h before\nConfirm attendance', defaultDurationDays: '3', defaultRoleTier: 'Manager',
      description: 'Coordinate calendars, book studio or client venue, agenda doc.' },
    /* Onboarding — Site Survey */
    { id: 3,  value: 'Site measurement walkthrough',  linkedActivity: 'Site Survey',
      defaultChecklist: 'Schedule measurement window with client\nCoordinate with PM and architect\nRecord floor-plate dimensions\nPhotograph existing condition\nMark service entries and shafts\nVerify ceiling heights at multiple points\nNote structural columns and beams', defaultDurationDays: '5', defaultRoleTier: 'Doer',
      description: 'Physical measurement of all rooms, photographs, condition documentation.' },
    { id: 4,  value: 'Photographic documentation',    linkedActivity: 'Site Survey',
      defaultChecklist: 'Wide shots of every room\nDetail shots of conditions\nFile with consistent naming\nUpload to project drive', defaultDurationDays: '2', defaultRoleTier: 'Doer',
      description: 'Wide and detail photos of every space — for the design team reference library.' },
    /* Concept — Mood Boards */
    { id: 5,  value: 'Build 3 mood board options',    linkedActivity: 'Mood Boards',
      defaultChecklist: 'Source 30+ reference images per direction\nCompose 3 boards\nMaterial samples physically attached\nWalkthrough rehearsed with PM\nFinal review with design lead', defaultDurationDays: '7', defaultRoleTier: 'Doer',
      description: 'Three distinct directions — material, palette, mood references.' },
    { id: 6,  value: 'Mood board client review',      linkedActivity: 'Mood Boards',
      defaultChecklist: 'Send pre-read 24h before\nWalkthrough each board\nCapture client preferences in writing\nLock direction or note revisions\nFollow up with summary email', defaultDurationDays: '3', defaultRoleTier: 'Manager',
      description: 'Present the 3 boards, capture client preferences and direction lock.' },
    /* Concept — Layout Options */
    { id: 7,  value: 'Draft 2-3 floor plan options',  linkedActivity: 'Layout Options',
      defaultChecklist: 'Block out 2-3 distinct schemes\nAnnotate each with rationale\nVerify against brief\nInternal review with senior designer', defaultDurationDays: '10', defaultRoleTier: 'Doer',
      description: 'Alternative layouts addressing brief — annotated for client.' },
    /* Design Development — Detailed Layouts */
    { id: 8,  value: 'Final dimensioned floor plan',  linkedActivity: 'Detailed Layouts',
      defaultChecklist: 'All rooms dimensioned\nAll fixtures placed\nAll furniture placed\nDoor swings shown\nDimensioning peer-reviewed\nTitle block updated\nIssue log entry made', defaultDurationDays: '12', defaultRoleTier: 'Doer',
      description: 'All rooms dimensioned with fixtures, furniture, equipment placement.' },
    /* Working Drawings — Joinery details */
    { id: 9,  value: 'Joinery section drawings',      linkedActivity: 'Joinery & Furniture Design',
      defaultChecklist: 'Sections drawn at correct scale\nElevations shown\nHardware specified\nMaterials specified\nPeer-reviewed before issuance\nIssue log entry made', defaultDurationDays: '14', defaultRoleTier: 'Doer',
      description: 'Cabinetry, wardrobes, built-ins — sections, elevations, hardware spec.' },
    /* Procurement — Vendor coordination */
    { id: 10, value: 'Send RFQ to shortlisted vendors', linkedActivity: 'Procurement',
      defaultChecklist: 'Compile final BOQ\nShortlist 3-5 vendors per category\nDraft RFQ document\nInclude scope and timeline\nSet quote deadline\nDispatch and log', defaultDurationDays: '5', defaultRoleTier: 'Manager',
      description: 'Issue request for quotation against finalised BOQ.' },
    { id: 11, value: 'Vendor selection meeting',      linkedActivity: 'Procurement',
      defaultChecklist: 'Compile quote comparison sheet\nFlag outliers and risks\nPrepare recommendation deck\nMeet with client to discuss\nFormalize selection in writing\nIssue PO', defaultDurationDays: '3', defaultRoleTier: 'Admin',
      description: 'Compare quotes, recommend selection to client, formalize PO.' },
    /* Snag List — Snag Walkthrough */
    { id: 12, value: 'Joint snag walkthrough',        linkedActivity: 'Snag Walkthrough',
      defaultChecklist: 'Schedule walkthrough with client and contractor\nPrint floor plans for marking\nWalk every space systematically\nLog every defect with location\nPhotograph each defect\nAgree priority levels\nDistribute snag list within 24h', defaultDurationDays: '2', defaultRoleTier: 'Manager',
      description: 'Walk every space with client and contractor, log every defect.' },
    /* Handover — Documentation Handover */
    { id: 13, value: 'Compile handover binder',       linkedActivity: 'Documentation Handover',
      defaultChecklist: 'Collect all warranty documents\nCollect all maintenance manuals\nCompile vendor contact directory\nPrint final drawings set\nPrint final BOQ\nAssemble in branded binder\nQC review before client meeting', defaultDurationDays: '5', defaultRoleTier: 'Doer',
      description: 'Warranties, maintenance manuals, vendor contacts, drawings, BOQ.' },
    { id: 14, value: 'Handover meeting with client',  linkedActivity: 'Documentation Handover',
      defaultChecklist: 'Confirm meeting with all stakeholders\nWalk handover binder\nDemonstrate equipment operation\nWalk maintenance protocols\nGet sign-off on completion form\nKeys handover\nFollow-up email with summary', defaultDurationDays: '1', defaultRoleTier: 'Admin',
      description: 'Walk the binder, demonstrate equipment, sign-off on completion.' },
  ],

  /* ============================================================
     MasterDeliverables (Phase 5.4) — the artefact produced by an Activity.
     linkedActivity = the activity that generates this deliverable.
     format = how the deliverable is presented (board / drawing / report / sample / etc.)
  ============================================================ */
  MasterDeliverables: [
    /* Mood Boards activity */
    { id: 1,  value: '3 Mood Boards (option set)',   linkedActivity: 'Mood Boards',
      format: 'Board', clientFacing: 'yes',
      description: 'Three direction options for client to choose between.' },
    { id: 2,  value: 'Material Reference Sheet',     linkedActivity: 'Mood Boards',
      format: 'Document', clientFacing: 'yes',
      description: 'Single sheet summarising materials seen across mood boards.' },
    /* Layout Options */
    { id: 3,  value: '2 Floor Plan Options',         linkedActivity: 'Layout Options',
      format: 'Drawing', clientFacing: 'yes',
      description: 'Two layout alternatives at 1:100 for client review.' },
    /* Material Direction */
    { id: 4,  value: 'Material Library Box',         linkedActivity: 'Material Direction',
      format: 'Sample', clientFacing: 'yes',
      description: 'Physical samples of every key finish and fabric.' },
    /* Volumetric 3D */
    { id: 5,  value: 'Volumetric 3D Walkthrough',    linkedActivity: 'Volumetric 3D',
      format: 'Render', clientFacing: 'yes',
      description: 'Quick volumetric renders showing spatial relationships.' },
    /* Cost Envelope */
    { id: 6,  value: 'Concept Cost Estimate',        linkedActivity: 'Cost Envelope',
      format: 'Document', clientFacing: 'yes',
      description: 'Order-of-magnitude budget for client to validate against pocket.' },
    /* Detailed Layouts */
    { id: 7,  value: 'Final Floor Plan Set',         linkedActivity: 'Detailed Layouts',
      format: 'Drawing', clientFacing: 'yes',
      description: 'Final layouts with all dimensions, fixtures, FF&E placement.' },
    /* Material Library (DD) */
    { id: 8,  value: 'Comprehensive Material Spec',  linkedActivity: 'Material Library',
      format: 'Document', clientFacing: 'no',
      description: 'Internal — every finish with code, supplier, application area.' },
    /* Photoreal 3D */
    { id: 9,  value: 'Hero Space Renders (5)',       linkedActivity: 'Photoreal 3D',
      format: 'Render', clientFacing: 'yes',
      description: 'Photoreal renders of the 5 most visible spaces.' },
    /* Joinery & Furniture */
    { id: 10, value: 'Joinery Drawings Pack',        linkedActivity: 'Joinery & Furniture Design',
      format: 'Drawing', clientFacing: 'no',
      description: 'Internal — joinery details for vendor execution.' },
    { id: 11, value: 'FF&E Schedule',                linkedActivity: 'Joinery & Furniture Design',
      format: 'Document', clientFacing: 'yes',
      description: 'Furniture, fixtures, equipment list with images and prices.' },
    /* Lighting */
    { id: 12, value: 'Reflected Ceiling Plan',       linkedActivity: 'Lighting Plan',
      format: 'Drawing', clientFacing: 'no',
      description: 'Working drawing with fixture positions.' },
    { id: 13, value: 'Lighting Selection Document',  linkedActivity: 'Lighting Plan',
      format: 'Document', clientFacing: 'yes',
      description: 'Fixture-by-fixture spec sheet with images.' },
    /* Architectural Drawings */
    { id: 14, value: 'GFC Drawing Set',              linkedActivity: 'Architectural Drawings',
      format: 'Drawing', clientFacing: 'no',
      description: 'Good-for-construction set — plans, elevations, sections.' },
    /* Joinery Detail */
    { id: 15, value: 'Joinery Shop Drawings',        linkedActivity: 'Joinery Detail Drawings',
      format: 'Drawing', clientFacing: 'no',
      description: 'Detailed shop drawings — each piece with hardware, finishes, dimensions.' },
    /* MEP */
    { id: 16, value: 'MEP Coordination Drawings',    linkedActivity: 'MEP Coordination',
      format: 'Drawing', clientFacing: 'no',
      description: 'Coordinated MEP drawings for execution.' },
    /* BOQ */
    { id: 17, value: 'Initial Quantity Sheet',       linkedActivity: 'Quantity Take-off',
      format: 'Spreadsheet', clientFacing: 'no',
      description: 'Internal quantity calculations from drawings.' },
    { id: 18, value: 'Vendor Quote Comparison',      linkedActivity: 'Vendor Quotation',
      format: 'Spreadsheet', clientFacing: 'no',
      description: 'Side-by-side comparison of vendor quotes per line item.' },
    { id: 19, value: 'Client BOQ Document',          linkedActivity: 'Final Costing',
      format: 'Document', clientFacing: 'yes',
      description: 'Final client-facing BOQ with markup, terms, schedule.' },
    /* Snag */
    { id: 20, value: 'Snag List Document',           linkedActivity: 'Snag Walkthrough',
      format: 'Document', clientFacing: 'yes',
      description: 'Photographed list of every defect to be resolved.' },
    /* Handover */
    { id: 21, value: 'Maintenance & Warranty Pack',  linkedActivity: 'Documentation Handover',
      format: 'Document', clientFacing: 'yes',
      description: 'Care instructions, warranty docs, vendor contacts.' },
    { id: 22, value: 'Portfolio Photos',             linkedActivity: 'Final Photoshoot',
      format: 'Image set', clientFacing: 'yes',
      description: 'Professional photography — for studio portfolio and client.' },
  ],

  /* spatial */
  /* ====================== Spatial cascade ======================
     Project Category → Property Type → Level → Zone → Space →
     Feature → Element → ┬─ Specification
                         ├─ Checklist
                         ├─ Drawing
                         ├─ Reference
                         └─ BOQ Item
  ============================================================= */

  MasterLevels: [
    // Villa — typical 3-floor villa
    { id: 1, value: 'Ground Floor',     propertyType: 'Villa',           levelType: 'Ground',   levelOrder: 0 },
    { id: 2, value: 'First Floor',      propertyType: 'Villa',           levelType: 'Upper',    levelOrder: 1 },
    { id: 3, value: 'Second Floor',     propertyType: 'Villa',           levelType: 'Upper',    levelOrder: 2 },
    { id: 4, value: 'Roof / Terrace',   propertyType: 'Villa',           levelType: 'Roof',     levelOrder: 3 },
    // Penthouse — 2 levels with terrace
    { id: 5, value: 'Lower Level',      propertyType: 'Penthouse',       levelType: 'Ground',   levelOrder: 0 },
    { id: 6, value: 'Upper Level',      propertyType: 'Penthouse',       levelType: 'Upper',    levelOrder: 1 },
    { id: 7, value: 'Terrace',          propertyType: 'Penthouse',       levelType: 'Roof',     levelOrder: 2 },
    // Café — single floor + mezzanine
    { id: 8, value: 'Ground Floor',     propertyType: 'Café',            levelType: 'Ground',   levelOrder: 0 },
    { id: 9, value: 'Mezzanine',        propertyType: 'Café',            levelType: 'Mezzanine',levelOrder: 1 },
    // Corporate HQ — 4 floors typical
    { id: 10, value: 'Ground Floor',    propertyType: 'Corporate HQ/HO', levelType: 'Ground',   levelOrder: 0 },
    { id: 11, value: '1st Floor',       propertyType: 'Corporate HQ/HO', levelType: 'Upper',    levelOrder: 1 },
    { id: 12, value: '2nd Floor',       propertyType: 'Corporate HQ/HO', levelType: 'Upper',    levelOrder: 2 },
    { id: 13, value: '3rd Floor',       propertyType: 'Corporate HQ/HO', levelType: 'Upper',    levelOrder: 3 },
    // Flat — single level
    { id: 14, value: 'Single Floor',    propertyType: 'Flat',            levelType: 'Ground',   levelOrder: 0 },
    // === Phase 9.1.35 — Luxury Apartment fully seeded ===
    // Typical: single floor in a high-rise, balcony, service deck/utility, optional terrace.
    { id: 15, value: 'Main Floor',      propertyType: 'Luxury Apartment',levelType: 'Ground',   levelOrder: 0 },
    { id: 16, value: 'Private Terrace', propertyType: 'Luxury Apartment',levelType: 'Roof',     levelOrder: 1 },
  ],
  MasterZones: [
    // Villa — distributed across levels
    { id: 1,  value: 'Public Areas',     propertyType: 'Villa', levelId: 1 },     // Ground
    { id: 2,  value: 'Wet Areas',        propertyType: 'Villa', levelId: 1 },     // Ground
    { id: 3,  value: 'Private Areas',    propertyType: 'Villa', levelId: 2 },     // First
    { id: 4,  value: 'Wet Areas',        propertyType: 'Villa', levelId: 2 },     // First
    { id: 5,  value: 'Private Areas',    propertyType: 'Villa', levelId: 3 },     // Second
    { id: 6,  value: 'Service Areas',    propertyType: 'Villa', levelId: 3 },     // Second
    { id: 7,  value: 'Outdoor Areas',    propertyType: 'Villa', levelId: 4 },     // Roof
    // Penthouse
    { id: 8,  value: 'Public Areas',     propertyType: 'Penthouse', levelId: 5 },
    { id: 9,  value: 'Wet Areas',        propertyType: 'Penthouse', levelId: 5 },
    { id: 10, value: 'Private Areas',    propertyType: 'Penthouse', levelId: 6 },
    { id: 11, value: 'Wet Areas',        propertyType: 'Penthouse', levelId: 6 },
    { id: 12, value: 'Outdoor / Terrace',propertyType: 'Penthouse', levelId: 7 },
    // Café
    { id: 13, value: 'Customer Areas',   propertyType: 'Café', levelId: 8 },
    { id: 14, value: 'Service Areas',    propertyType: 'Café', levelId: 8 },
    { id: 15, value: 'Back of House',    propertyType: 'Café', levelId: 9 },
    // Corporate HQ
    { id: 16, value: 'Reception & Lobby',propertyType: 'Corporate HQ/HO', levelId: 10 },
    { id: 17, value: 'Cafeteria',        propertyType: 'Corporate HQ/HO', levelId: 10 },
    { id: 18, value: 'Workspace',        propertyType: 'Corporate HQ/HO', levelId: 11 },
    { id: 19, value: 'Meeting Rooms',    propertyType: 'Corporate HQ/HO', levelId: 12 },
    { id: 20, value: 'Cabins',           propertyType: 'Corporate HQ/HO', levelId: 13 },
    { id: 21, value: 'Service Areas',    propertyType: 'Corporate HQ/HO', levelId: 13 },
    // Flat
    { id: 22, value: 'Public Areas',     propertyType: 'Flat', levelId: 14 },
    { id: 23, value: 'Private Areas',    propertyType: 'Flat', levelId: 14 },
    { id: 24, value: 'Wet Areas',        propertyType: 'Flat', levelId: 14 },
    // === Phase 9.1.35 — Luxury Apartment deeply seeded ===
    // Main Floor zones: rich vocabulary used in luxury residential briefs
    { id: 25, value: 'Arrival & Foyer',          propertyType: 'Luxury Apartment', levelId: 15 },
    { id: 26, value: 'Living & Entertaining',    propertyType: 'Luxury Apartment', levelId: 15 },
    { id: 27, value: 'Dining',                   propertyType: 'Luxury Apartment', levelId: 15 },
    { id: 28, value: 'Kitchen & Pantry',         propertyType: 'Luxury Apartment', levelId: 15 },
    { id: 29, value: 'Master Suite',             propertyType: 'Luxury Apartment', levelId: 15 },
    { id: 30, value: 'Family Bedrooms',          propertyType: 'Luxury Apartment', levelId: 15 },
    { id: 31, value: 'Guest Suite',              propertyType: 'Luxury Apartment', levelId: 15 },
    { id: 32, value: 'Study / Home Office',      propertyType: 'Luxury Apartment', levelId: 15 },
    { id: 33, value: 'Powder & Common Bath',     propertyType: 'Luxury Apartment', levelId: 15 },
    { id: 34, value: 'Service & Utility',        propertyType: 'Luxury Apartment', levelId: 15 },
    { id: 35, value: 'Balconies & Decks',        propertyType: 'Luxury Apartment', levelId: 15 },
    // Private Terrace zones
    { id: 36, value: 'Outdoor Lounge',           propertyType: 'Luxury Apartment', levelId: 16 },
    { id: 37, value: 'Landscape & Garden',       propertyType: 'Luxury Apartment', levelId: 16 },
  ],
  MasterSpaces: [
    // Villa — Ground/Public
    { id: 1, value: 'Foyer', zoneId: 1 },
    { id: 2, value: 'Living Room', zoneId: 1 },
    { id: 3, value: 'Dining', zoneId: 1 },
    { id: 4, value: 'Powder Room', zoneId: 2 },
    { id: 5, value: 'Kitchen', zoneId: 2 },
    // Villa — First/Private
    { id: 6, value: 'Master Bedroom', zoneId: 3 },
    { id: 7, value: "Children's Room", zoneId: 3 },
    { id: 8, value: 'Master Bathroom', zoneId: 4 },
    { id: 9, value: 'Common Bathroom', zoneId: 4 },
    // Villa — Second/Private + Service
    { id: 10, value: 'Guest Bedroom', zoneId: 5 },
    { id: 11, value: 'Study', zoneId: 5 },
    { id: 12, value: 'Servant Quarter', zoneId: 6 },
    { id: 13, value: 'Storage', zoneId: 6 },
    // Villa — Roof
    { id: 14, value: 'Garden', zoneId: 7 },
    { id: 15, value: 'Terrace', zoneId: 7 },
    // Café — Customer
    { id: 16, value: 'Seating', zoneId: 13 },
    { id: 17, value: 'Counter', zoneId: 13 },
    { id: 18, value: 'Order Pickup', zoneId: 13 },
    // Café — Service
    { id: 19, value: 'Kitchen', zoneId: 14 },
    { id: 20, value: 'Dishwash', zoneId: 14 },
    { id: 21, value: 'Storage', zoneId: 14 },
    // Café — BOH
    { id: 22, value: 'Office', zoneId: 15 },
    { id: 23, value: 'Staff Toilet', zoneId: 15 },
    // Corporate HQ — Workspace
    { id: 24, value: 'Open Workstations', zoneId: 18 },
    { id: 25, value: 'Phone Booths', zoneId: 18 },
    { id: 26, value: 'Collaboration Zones', zoneId: 18 },
    // === Phase 9.1.35 — Luxury Apartment spaces (one per zone, deeply opinionated) ===
    // Arrival & Foyer (zoneId 25)
    { id: 27, value: 'Entry Lobby',                  zoneId: 25 },
    { id: 28, value: 'Shoe & Coat Niche',            zoneId: 25 },
    { id: 29, value: 'Display / Console Wall',       zoneId: 25 },
    // Living & Entertaining (zoneId 26)
    { id: 30, value: 'Main Living Room',             zoneId: 26 },
    { id: 31, value: 'Formal Sitting Lounge',        zoneId: 26 },
    { id: 32, value: 'Bar Counter',                  zoneId: 26 },
    { id: 33, value: 'Media / TV Wall',              zoneId: 26 },
    { id: 34, value: 'Reading Nook',                 zoneId: 26 },
    // Dining (zoneId 27)
    { id: 35, value: 'Formal Dining',                zoneId: 27 },
    { id: 36, value: 'Breakfast Counter',            zoneId: 27 },
    { id: 37, value: 'Crockery Display',             zoneId: 27 },
    // Kitchen & Pantry (zoneId 28)
    { id: 38, value: 'Main Kitchen',                 zoneId: 28 },
    { id: 39, value: 'Wet Kitchen / Spice Kitchen',  zoneId: 28 },
    { id: 40, value: 'Walk-in Pantry',               zoneId: 28 },
    { id: 41, value: 'Utility / Laundry Niche',      zoneId: 28 },
    // Master Suite (zoneId 29)
    { id: 42, value: 'Master Bedroom',               zoneId: 29 },
    { id: 43, value: 'Master Walk-in Wardrobe',      zoneId: 29 },
    { id: 44, value: 'Master Bathroom',              zoneId: 29 },
    { id: 45, value: 'Master Dressing Area',         zoneId: 29 },
    { id: 46, value: 'Master Lounge / Reading Area', zoneId: 29 },
    // Family Bedrooms (zoneId 30)
    { id: 47, value: "Daughter's Bedroom",           zoneId: 30 },
    { id: 48, value: "Son's Bedroom",                zoneId: 30 },
    { id: 49, value: 'Family Bathroom',              zoneId: 30 },
    { id: 50, value: 'Family Wardrobe',              zoneId: 30 },
    // Guest Suite (zoneId 31)
    { id: 51, value: 'Guest Bedroom',                zoneId: 31 },
    { id: 52, value: 'Guest Bathroom',               zoneId: 31 },
    { id: 53, value: 'Guest Wardrobe',               zoneId: 31 },
    // Study / Home Office (zoneId 32)
    { id: 54, value: 'Home Office',                  zoneId: 32 },
    { id: 55, value: 'Library / Bookshelf Wall',     zoneId: 32 },
    { id: 56, value: 'Pooja / Meditation Corner',    zoneId: 32 },
    // Powder & Common Bath (zoneId 33)
    { id: 57, value: 'Powder Room',                  zoneId: 33 },
    { id: 58, value: 'Common Bathroom',              zoneId: 33 },
    // Service & Utility (zoneId 34)
    { id: 59, value: 'Servant Quarter',              zoneId: 34 },
    { id: 60, value: 'Staff Toilet',                 zoneId: 34 },
    { id: 61, value: 'Store Room',                   zoneId: 34 },
    { id: 62, value: 'Electrical / DB Niche',        zoneId: 34 },
    { id: 63, value: 'AC Plant / Service Shaft',     zoneId: 34 },
    // Balconies & Decks (zoneId 35)
    { id: 64, value: 'Living Balcony',               zoneId: 35 },
    { id: 65, value: 'Master Bedroom Balcony',       zoneId: 35 },
    { id: 66, value: 'Kitchen Service Deck',         zoneId: 35 },
    // Outdoor Lounge (zoneId 36)
    { id: 67, value: 'Outdoor Seating',              zoneId: 36 },
    { id: 68, value: 'Outdoor Dining',               zoneId: 36 },
    { id: 69, value: 'Outdoor Bar',                  zoneId: 36 },
    { id: 70, value: 'Jacuzzi / Plunge Pool',        zoneId: 36 },
    // Landscape & Garden (zoneId 37)
    { id: 71, value: 'Planters & Greens',            zoneId: 37 },
    { id: 72, value: 'Water Feature',                zoneId: 37 },
    { id: 73, value: 'Pergola / Trellis',            zoneId: 37 },
  ],
  MasterFeatures: [
    // Living Room
    { id: 1, value: 'Wall Treatment', spaceId: 2 },
    { id: 2, value: 'Flooring', spaceId: 2 },
    { id: 3, value: 'Lighting', spaceId: 2 },
    { id: 4, value: 'Furniture', spaceId: 2 },
    { id: 5, value: 'False Ceiling', spaceId: 2 },
    // Master Bedroom
    { id: 6, value: 'Wall Treatment', spaceId: 6 },
    { id: 7, value: 'Flooring', spaceId: 6 },
    { id: 8, value: 'Wardrobe', spaceId: 6 },
    { id: 9, value: 'Bed & Headboard', spaceId: 6 },
    { id: 10, value: 'Lighting', spaceId: 6 },
    // Master Bathroom
    { id: 11, value: 'Wall Tiling', spaceId: 8 },
    { id: 12, value: 'Floor Tiling', spaceId: 8 },
    { id: 13, value: 'Sanitary Ware', spaceId: 8 },
    { id: 14, value: 'Vanity', spaceId: 8 },
    { id: 15, value: 'Shower Enclosure', spaceId: 8 },
    // Kitchen
    { id: 16, value: 'Cabinetry', spaceId: 5 },
    { id: 17, value: 'Countertop', spaceId: 5 },
    { id: 18, value: 'Backsplash', spaceId: 5 },
    { id: 19, value: 'Appliances', spaceId: 5 },
    // Café Seating
    { id: 20, value: 'Tables & Chairs', spaceId: 16 },
    { id: 21, value: 'Banquette', spaceId: 16 },
    { id: 22, value: 'Lighting', spaceId: 16 },
    { id: 23, value: 'Wall Treatment', spaceId: 16 },
    // === Phase 9.1.35 — Luxury Apartment features for the deepest-seeded spaces ===
    // Main Living Room (spaceId 30)
    { id: 24, value: 'Flooring',                     spaceId: 30 },
    { id: 25, value: 'Wall Treatment',               spaceId: 30 },
    { id: 26, value: 'False Ceiling',                spaceId: 30 },
    { id: 27, value: 'Lighting',                     spaceId: 30 },
    { id: 28, value: 'Drapery & Window Treatment',   spaceId: 30 },
    { id: 29, value: 'Sofa & Seating',               spaceId: 30 },
    { id: 30, value: 'Media / TV Joinery',           spaceId: 30 },
    { id: 31, value: 'Coffee & Side Tables',         spaceId: 30 },
    { id: 32, value: 'Art & Accessories',            spaceId: 30 },
    { id: 33, value: 'AV / Smart Home',              spaceId: 30 },
    { id: 34, value: 'HVAC',                         spaceId: 30 },
    // Bar Counter (spaceId 32)
    { id: 35, value: 'Bar Counter Joinery',          spaceId: 32 },
    { id: 36, value: 'Back-bar Display',             spaceId: 32 },
    { id: 37, value: 'Lighting',                     spaceId: 32 },
    { id: 38, value: 'Bar Stools',                   spaceId: 32 },
    // Formal Dining (spaceId 35)
    { id: 39, value: 'Dining Table',                 spaceId: 35 },
    { id: 40, value: 'Dining Chairs',                spaceId: 35 },
    { id: 41, value: 'Sideboard / Buffet',           spaceId: 35 },
    { id: 42, value: 'Chandelier',                   spaceId: 35 },
    { id: 43, value: 'Wall Art / Mirror Panel',      spaceId: 35 },
    { id: 44, value: 'Flooring',                     spaceId: 35 },
    // Main Kitchen (spaceId 38)
    { id: 45, value: 'Cabinetry',                    spaceId: 38 },
    { id: 46, value: 'Countertop',                   spaceId: 38 },
    { id: 47, value: 'Backsplash',                   spaceId: 38 },
    { id: 48, value: 'Appliances',                   spaceId: 38 },
    { id: 49, value: 'Sink & Faucets',               spaceId: 38 },
    { id: 50, value: 'Island / Breakfast Counter',   spaceId: 38 },
    { id: 51, value: 'Lighting',                     spaceId: 38 },
    { id: 52, value: 'Tall Storage Wall',            spaceId: 38 },
    // Master Bedroom (spaceId 42)
    { id: 53, value: 'Flooring',                     spaceId: 42 },
    { id: 54, value: 'Wall Treatment',               spaceId: 42 },
    { id: 55, value: 'False Ceiling',                spaceId: 42 },
    { id: 56, value: 'Bed & Headboard',              spaceId: 42 },
    { id: 57, value: 'Bedside Tables',               spaceId: 42 },
    { id: 58, value: 'Lighting',                     spaceId: 42 },
    { id: 59, value: 'Drapery',                      spaceId: 42 },
    { id: 60, value: 'Reading Chair / Bench',        spaceId: 42 },
    { id: 61, value: 'TV / Media Wall',              spaceId: 42 },
    { id: 62, value: 'HVAC',                         spaceId: 42 },
    // Master Walk-in Wardrobe (spaceId 43)
    { id: 63, value: 'Wardrobe Shutters',            spaceId: 43 },
    { id: 64, value: 'Wardrobe Internals',           spaceId: 43 },
    { id: 65, value: 'Island / Dresser',             spaceId: 43 },
    { id: 66, value: 'Mirror & Lighting',            spaceId: 43 },
    { id: 67, value: 'Shoe & Bag Display',           spaceId: 43 },
    { id: 68, value: 'Seating',                      spaceId: 43 },
    // Master Bathroom (spaceId 44)
    { id: 69, value: 'Wall Cladding',                spaceId: 44 },
    { id: 70, value: 'Floor Tiling',                 spaceId: 44 },
    { id: 71, value: 'Vanity Joinery',               spaceId: 44 },
    { id: 72, value: 'Sanitary Ware',                spaceId: 44 },
    { id: 73, value: 'Shower Enclosure',             spaceId: 44 },
    { id: 74, value: 'Bathtub',                      spaceId: 44 },
    { id: 75, value: 'Lighting & Mirror',            spaceId: 44 },
    { id: 76, value: 'Towel Warmer / Accessories',   spaceId: 44 },
    { id: 77, value: 'Ventilation',                  spaceId: 44 },
  ],

  /* ============================================================
     Phase 8.1 — Universal Space + Zone Libraries (Choice 2 architecture)
     ============================================================
     The vision: instead of duplicating "Bathroom" 20 times (once per property type),
     define it ONCE in MasterSpaceLibrary and reference it from many property type
     assemblies. Studios update the canonical Bathroom definition in one place.

     `applicableTo` uses the MasterProjectCategory vocabulary already in the system
     ('Home Owner', 'F&B', 'Offices', 'Hospitality & Leisure', 'Retail', etc.).
     'all' = applicable to every category. Multiple categories allowed (CSV-style).

     This table COEXISTS with the legacy MasterZones / MasterSpaces during transition.
     Phase 8.4 will switch read paths to use this; Phase 8.5 may retire the old. */
  MasterZoneLibrary: [
    /* === Phase 8.1 — Universal Zone Library (Luxury vocabulary applied per user instruction) ===
       17 residential luxury zones authored by user, plus retained commercial/F&B/office zones.
       'applicableTo' uses MasterProjectCategory vocabulary. */

    /* Residential luxury zones (Home Owner) */
    { id: 1,  value: 'Arrival & Transition Zone',                       applicableTo: 'Home Owner', description: 'Foyer, entry passage, vestibule, welcome lounge, shoe & cloak area.' },
    { id: 2,  value: 'Formal Living & Entertaining Zone',               applicableTo: 'Home Owner', description: 'Reception areas, formal lounge, conversation lounge, bar lounge.' },
    { id: 3,  value: 'Informal Family Living Zone',                     applicableTo: 'Home Owner', description: 'Family living, TV lounge, reading and gaming corners.' },
    { id: 4,  value: 'Dining & Hosting Zone',                           applicableTo: 'Home Owner', description: 'Formal & informal dining, breakfast nook, private dining, serving counter.' },
    { id: 5,  value: 'Kitchen, Utility & Service Zone',                 applicableTo: 'Home Owner', description: 'Main / dry / wet kitchen, pantry, laundry, staff areas.' },
    { id: 6,  value: 'Private Family Bedroom Zone',                     applicableTo: 'Home Owner', description: "Children, teenager, family, sibling bedrooms." },
    { id: 7,  value: 'Master Suite & Personal Retreat Zone',            applicableTo: 'Home Owner', description: 'Master bedroom, walk-in wardrobe, dressing room, master bathroom, private balcony.' },
    { id: 8,  value: "Children's Learning & Lifestyle Zone",            applicableTo: 'Home Owner', description: 'Study, activity, play, creative & learning spaces for children.' },
    { id: 9,  value: 'Guest Hospitality Zone',                          applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Guest bedrooms, suites, lounge, bathroom.' },
    { id: 10, value: 'Work, Study & Productivity Zone',                 applicableTo: 'Home Owner, Offices', description: 'Home office, executive study, library, workstations.' },
    { id: 11, value: 'Wellness, Leisure & Recreation Zone',             applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Gym, yoga, meditation, spa, massage, theatre, gaming, music.' },
    { id: 12, value: 'Dressing, Grooming & Personal Care Zone',         applicableTo: 'Home Owner', description: 'Walk-in closet, vanity, salon corner, powder room, common bathroom.' },
    { id: 13, value: 'Balcony, Deck & Outdoor Living Zone',             applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Sit-outs, sky deck, terrace lounge, outdoor dining.' },
    { id: 14, value: 'Storage, Back-of-House & Support Zone',           applicableTo: 'Home Owner', description: 'Linen, luggage, cleaning, utility, seasonal storage.' },
    { id: 15, value: 'Spiritual, Reflection & Mindfulness Zone',        applicableTo: 'Home Owner', description: 'Pooja, prayer, meditation niche, contemplation corner.' },
    { id: 16, value: 'Luxury Experience, Showcase & Collection Zone',   applicableTo: 'Home Owner', description: 'Art gallery wall, display lounge, collectibles, wine display, luxury showcase.' },
    { id: 17, value: 'Circulation, Connectivity & Spatial Flow Zone',   applicableTo: 'Home Owner', description: 'Main passage, private corridor, transition lobby, stair lobby, lift lobby.' },

    /* Retained commercial / office / hospitality zones — used by other property types (not Luxury Apartment).
       These remain available for Café, Corporate HQ, Hotel, Retail, etc. in future assemblies. */
    { id: 18, value: 'Reception & Lobby',                               applicableTo: 'Offices, Hospitality & Leisure, F&B', description: 'First-impression entry zones for commercial properties.' },
    { id: 19, value: 'Workspace',                                       applicableTo: 'Offices', description: 'Open desks, focus zones, phone booths.' },
    { id: 20, value: 'Meeting Rooms',                                   applicableTo: 'Offices', description: 'Conference, huddle, board rooms.' },
    { id: 21, value: 'Cabins',                                          applicableTo: 'Offices', description: 'Private executive offices.' },
    { id: 22, value: 'Cafeteria',                                       applicableTo: 'Offices', description: 'Staff dining, pantry, break areas.' },
    { id: 23, value: 'Customer Areas',                                  applicableTo: 'F&B, Retail, Hospitality & Leisure', description: 'Public-facing customer experience zones.' },
    { id: 24, value: 'Back of House',                                   applicableTo: 'F&B, Retail, Hospitality & Leisure, Offices', description: 'Staff-only operational zones.' },
  ],

  MasterSpaceLibrary: [
    /* === Phase 8.1 — Universal Space Library (Luxury vocabulary applied per user instruction) ===
       Authored from user's 17-zone Luxury Apartment vocabulary, with near-duplicates consolidated
       per Q2 decision. Commercial / F&B / Office spaces retained for non-residential property types.
       'applicableTo' uses MasterProjectCategory vocabulary. */

    /* === ARRIVAL & TRANSITION === */
    { id: 1,  value: 'Entrance Foyer',                applicableTo: 'Home Owner', description: 'Primary entry point of the apartment.' },
    { id: 2,  value: 'Entry Passage',                 applicableTo: 'Home Owner', description: 'Connecting passage from foyer to interior.' },
    { id: 3,  value: 'Welcome Lounge',                applicableTo: 'Home Owner', description: 'Small seated area for first-impression hosting.' },
    { id: 4,  value: 'Vestibule',                     applicableTo: 'Home Owner', description: 'Small enclosed area between outer door and main interior.' },
    { id: 5,  value: 'Shoe & Cloak Area',             applicableTo: 'Home Owner', description: 'Storage for footwear and outerwear at entry.' },
    { id: 6,  value: 'Arrival Console Area',          applicableTo: 'Home Owner', description: 'Console table, mirror, key drop area.' },

    /* === FORMAL LIVING & ENTERTAINING === */
    { id: 7,  value: 'Formal Living Room',            applicableTo: 'Home Owner', description: 'Primary formal living space for guests.' },
    { id: 8,  value: 'Formal Lounge',                 applicableTo: 'Home Owner', description: 'Intimate formal sitting area.' },
    { id: 9,  value: 'Guest Sitting Area',            applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Dedicated visitor seating.' },
    { id: 10, value: 'Conversation Lounge',           applicableTo: 'Home Owner', description: 'Curated seating designed for dialogue.' },
    { id: 11, value: 'Entertainment Lounge',          applicableTo: 'Home Owner', description: 'Lounge oriented toward AV / entertainment.' },
    { id: 12, value: 'Bar Lounge',                    applicableTo: 'Home Owner, F&B, Hospitality & Leisure', description: 'Lounge with bar / drinks counter.' },
    { id: 13, value: 'Piano / Art Corner',            applicableTo: 'Home Owner', description: 'Designated zone for piano or artistic display.' },

    /* === INFORMAL FAMILY LIVING === */
    { id: 14, value: 'Family Living Room',            applicableTo: 'Home Owner', description: 'Primary informal living space for family.' },
    { id: 15, value: 'TV Lounge',                     applicableTo: 'Home Owner', description: 'Casual seating around television (consolidated with casual lounge / family seating).' },
    { id: 16, value: 'Reading Corner',                applicableTo: 'Home Owner', description: 'Quiet seating with books and reading light.' },
    { id: 17, value: 'Gaming Corner',                 applicableTo: 'Home Owner', description: 'Console gaming or board game area.' },

    /* === DINING & HOSTING === */
    { id: 18, value: 'Formal Dining Room',            applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Primary formal dining space.' },
    { id: 19, value: 'Informal Dining Area',          applicableTo: 'Home Owner', description: 'Casual everyday family dining.' },
    { id: 20, value: 'Breakfast Nook',                applicableTo: 'Home Owner', description: 'Compact morning eating area near kitchen.' },
    { id: 21, value: 'Private Dining Space',          applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Intimate enclosed dining area.' },
    { id: 22, value: 'Serving Counter Area',          applicableTo: 'Home Owner', description: 'Buffet / serving station between kitchen and dining.' },

    /* === KITCHEN, UTILITY & SERVICE === */
    { id: 23, value: 'Main Kitchen',                  applicableTo: 'Home Owner, F&B, Hospitality & Leisure', description: 'Primary cooking kitchen.' },
    { id: 24, value: 'Show Kitchen',                  applicableTo: 'Home Owner', description: 'Display kitchen for entertaining and lighter cooking.' },
    { id: 25, value: 'Dry Kitchen',                   applicableTo: 'Home Owner', description: 'Light prep, beverages, no heavy cooking.' },
    { id: 26, value: 'Wet Kitchen',                   applicableTo: 'Home Owner', description: 'Heavy cooking with full ventilation.' },
    { id: 27, value: 'Pantry',                        applicableTo: 'Home Owner, F&B, Hospitality & Leisure', description: 'Dry goods and grocery storage.' },
    { id: 28, value: 'Utility Room',                  applicableTo: 'Home Owner', description: 'Cleaning supplies, equipment, household tasks.' },
    { id: 29, value: 'Laundry Area',                  applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Washing, drying, ironing.' },
    { id: 30, value: 'Store Room',                    applicableTo: 'Home Owner', description: 'General household storage.' },
    { id: 31, value: 'Staff Pantry',                  applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Staff-only food prep / break area.' },
    { id: 32, value: 'Housekeeping Store',            applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Cleaning supplies and equipment.' },
    { id: 33, value: 'Staff Room',                    applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Live-in staff quarters.' },

    /* === PRIVATE FAMILY BEDROOM === */
    { id: 34, value: "Children's Bedroom",            applicableTo: 'Home Owner', description: 'Primary kids bedroom.' },
    { id: 35, value: 'Teenager Bedroom',              applicableTo: 'Home Owner', description: 'Bedroom for teen-aged children.' },
    { id: 36, value: 'Family Bedroom',                applicableTo: 'Home Owner', description: 'Bedroom for parents or extended family.' },
    { id: 37, value: 'Sibling Shared Bedroom',        applicableTo: 'Home Owner', description: 'Shared bedroom for multiple siblings.' },

    /* === MASTER SUITE & PERSONAL RETREAT === */
    { id: 38, value: 'Master Bedroom',                applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Primary bedroom for the household head(s).' },
    { id: 39, value: 'Private Lounge',                applicableTo: 'Home Owner', description: 'Sitting area within the master suite.' },
    { id: 40, value: 'Walk-in Wardrobe',              applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Dedicated dressing / wardrobe room (consolidated with walk-in closet, wardrobe room).' },
    { id: 41, value: 'Dressing Room',                 applicableTo: 'Home Owner', description: 'Dedicated room for getting ready.' },
    { id: 42, value: 'Master Bathroom',               applicableTo: 'Home Owner, Hospitality & Leisure', description: 'En-suite bathroom for master suite.' },
    { id: 43, value: 'Private Balcony',               applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Balcony attached to master suite.' },
    { id: 44, value: 'Vanity Area',                   applicableTo: 'Home Owner', description: 'Make-up and grooming counter within bedroom.' },

    /* === CHILDREN'S LEARNING & LIFESTYLE === */
    { id: 45, value: 'Study Room',                    applicableTo: 'Home Owner', description: 'Dedicated room for studies and homework.' },
    { id: 46, value: 'Play Room',                     applicableTo: 'Home Owner', description: 'Dedicated children\'s play area (consolidated with activity room).' },
    { id: 47, value: 'Creative Corner',               applicableTo: 'Home Owner', description: 'Art, craft, music for children.' },
    { id: 48, value: 'Learning Nook',                 applicableTo: 'Home Owner', description: 'Reading and quiet learning space.' },

    /* === GUEST HOSPITALITY === */
    { id: 49, value: 'Guest Bedroom',                 applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Primary visitor bedroom.' },
    { id: 50, value: 'Guest Suite',                   applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Bedroom + bathroom + sitting for extended guest stays.' },
    { id: 51, value: 'Guest Lounge',                  applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Dedicated lounge area for visitors.' },
    { id: 52, value: 'Guest Bathroom',                applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Bathroom for guest bedrooms.' },

    /* === WORK, STUDY & PRODUCTIVITY === */
    { id: 53, value: 'Home Office',                   applicableTo: 'Home Owner', description: 'Dedicated work-from-home space.' },
    { id: 54, value: 'Executive Study',               applicableTo: 'Home Owner', description: 'Premium study with executive desk.' },
    { id: 55, value: 'Library',                       applicableTo: 'Home Owner, Hospitality & Leisure, Institutional', description: 'Reading and book storage.' },
    { id: 56, value: 'Meeting Corner',                applicableTo: 'Home Owner, Offices', description: 'Small in-home meeting area.' },
    { id: 57, value: 'Workstation Area',              applicableTo: 'Home Owner, Offices', description: 'Multiple-desk workspace.' },

    /* === WELLNESS, LEISURE & RECREATION === */
    { id: 58, value: 'Home Gym',                      applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Exercise equipment area.' },
    { id: 59, value: 'Yoga Room',                     applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Dedicated active wellness room.' },
    { id: 60, value: 'Meditation Room',               applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Dedicated stillness room.' },
    { id: 61, value: 'Spa Area',                      applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Spa, sauna, hammam area.' },
    { id: 62, value: 'Massage Room',                  applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Treatment room for massages.' },
    { id: 63, value: 'Home Theatre',                  applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Dedicated cinema / media room.' },
    { id: 64, value: 'Gaming Lounge',                 applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Pool, foosball, gaming consoles area.' },
    { id: 65, value: 'Music Room',                    applicableTo: 'Home Owner', description: 'Instruments, recording, listening.' },

    /* === DRESSING, GROOMING & PERSONAL CARE === */
    { id: 66, value: 'Vanity Room',                   applicableTo: 'Home Owner', description: 'Dedicated grooming room (consolidated with make-up area).' },
    { id: 67, value: 'Salon Corner',                  applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Full-service grooming setup.' },
    { id: 68, value: 'Powder Room',                   applicableTo: 'Home Owner', description: 'Guest WC near public areas.' },
    { id: 69, value: 'Common Bathroom',               applicableTo: 'Home Owner', description: 'Shared bathroom for non-master bedrooms.' },

    /* === BALCONY, DECK & OUTDOOR LIVING === */
    { id: 70, value: 'Sit-out Balcony',               applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Compact outdoor seating balcony.' },
    { id: 71, value: 'Sky Deck',                      applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Elevated outdoor entertaining deck.' },
    { id: 72, value: 'Terrace Lounge',                applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Furnished terrace for hosting.' },
    { id: 73, value: 'Outdoor Seating',               applicableTo: 'Home Owner, Hospitality & Leisure, F&B', description: 'Outdoor furnished area (consolidated with outdoor dining).' },
    { id: 74, value: 'Green Balcony',                 applicableTo: 'Home Owner', description: 'Balcony with planting / garden design.' },
    { id: 75, value: 'Private Deck',                  applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Private outdoor wooden deck.' },

    /* === STORAGE, BACK-OF-HOUSE & SUPPORT === */
    { id: 76, value: 'Linen Store',                   applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Bedlinen, towels, table linen storage.' },
    { id: 77, value: 'General Storage',               applicableTo: 'all', description: 'Universal storage (consolidated with utility storage).' },
    { id: 78, value: 'Luggage Room',                  applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Suitcase and travel gear storage.' },
    { id: 79, value: 'Cleaning Store',                applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Cleaning supplies and equipment.' },
    { id: 80, value: 'Seasonal Storage',              applicableTo: 'Home Owner', description: 'Storage for seasonal items (woolens, festive, etc).' },

    /* === SPIRITUAL, REFLECTION & MINDFULNESS === */
    { id: 81, value: 'Pooja Room',                    applicableTo: 'Home Owner', description: 'Hindu prayer room (Indian context).' },
    { id: 82, value: 'Prayer Room',                   applicableTo: 'Home Owner', description: 'General-faith prayer / worship room.' },
    { id: 83, value: 'Meditation Niche',              applicableTo: 'Home Owner', description: 'Small alcove for meditation.' },
    { id: 84, value: 'Contemplation Corner',          applicableTo: 'Home Owner', description: 'Quiet thinking space.' },

    /* === LUXURY EXPERIENCE, SHOWCASE & COLLECTION === */
    { id: 85, value: 'Art Gallery Wall',              applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Curated art wall for display.' },
    { id: 86, value: 'Display Lounge',                applicableTo: 'Home Owner, Hospitality & Leisure', description: 'Lounge organised around display pieces.' },
    { id: 87, value: 'Collectibles Display Area',     applicableTo: 'Home Owner', description: 'Showcase for personal collections.' },
    { id: 88, value: 'Wine Display Room',             applicableTo: 'Home Owner, F&B, Hospitality & Leisure', description: 'Wine cellar with display elements.' },
    { id: 89, value: 'Luxury Showcase Wall',          applicableTo: 'Home Owner', description: 'Dedicated wall for premium objects / vehicles / heritage.' },

    /* === CIRCULATION, CONNECTIVITY & SPATIAL FLOW === */
    { id: 90, value: 'Main Passage',                  applicableTo: 'all', description: 'Primary public corridor.' },
    { id: 91, value: 'Private Corridor',              applicableTo: 'Home Owner', description: 'Bedroom-side or service-side corridor.' },
    { id: 92, value: 'Transition Lobby',              applicableTo: 'Home Owner', description: 'Inter-zone connecting lobby.' },
    { id: 93, value: 'Internal Staircase',            applicableTo: 'Home Owner', description: 'Vertical circulation within unit (consolidated with stair lobby).' },
    { id: 94, value: 'Lift Lobby',                    applicableTo: 'all', description: 'Elevator entry point.' },

    /* === RETAINED COMMERCIAL / OFFICE / F&B / RETAIL ===
       These remain in the library for non-residential property types.
       Phase 8.2 assemblies will pick from these for Office, Café, Hotel, Retail, etc. */
    { id: 95,  value: 'Reception Desk',                applicableTo: 'Offices, Hospitality & Leisure, F&B', description: 'Front-of-house check-in.' },
    { id: 96,  value: 'Waiting Lounge',                applicableTo: 'Offices, Hospitality & Leisure, Health Care', description: 'Visitor waiting area.' },
    { id: 97,  value: 'Open Workstations',             applicableTo: 'Offices', description: 'Open-plan desks.' },
    { id: 98,  value: 'Phone Booths',                  applicableTo: 'Offices', description: 'Single-person call rooms.' },
    { id: 99,  value: 'Collaboration Zones',           applicableTo: 'Offices', description: 'Informal meeting and brainstorm areas.' },
    { id: 100, value: 'Conference Room',               applicableTo: 'Offices', description: 'Formal meeting room (8-12 pax).' },
    { id: 101, value: 'Board Room',                    applicableTo: 'Offices', description: 'Executive meeting room.' },
    { id: 102, value: 'Huddle Room',                   applicableTo: 'Offices', description: 'Small meeting space (2-4 pax).' },
    { id: 103, value: 'Executive Cabin',               applicableTo: 'Offices', description: 'Private leadership office.' },
    { id: 104, value: 'Manager Cabin',                 applicableTo: 'Offices', description: 'Private mid-management office.' },
    { id: 105, value: 'Office Pantry',                 applicableTo: 'Offices', description: 'Office tea/coffee station.' },
    { id: 106, value: 'Cafeteria Seating',             applicableTo: 'Offices, Institutional', description: 'Staff dining seating.' },
    { id: 107, value: 'Customer Seating',              applicableTo: 'F&B, Hospitality & Leisure', description: 'Customer dining/seating area.' },
    { id: 108, value: 'Order Counter',                 applicableTo: 'F&B, Retail', description: 'Order/billing counter.' },
    { id: 109, value: 'Order Pickup',                  applicableTo: 'F&B', description: 'Takeaway pickup zone.' },
    { id: 110, value: 'Bar Counter',                   applicableTo: 'F&B, Hospitality & Leisure', description: 'Beverage service counter.' },
    { id: 111, value: 'Dishwash Area',                 applicableTo: 'F&B, Hospitality & Leisure', description: 'Dishwashing area.' },
    { id: 112, value: 'Display Area',                  applicableTo: 'Retail', description: 'Product display zone.' },
    { id: 113, value: 'Trial Room',                    applicableTo: 'Retail', description: 'Fitting / trial cabin.' },
    { id: 114, value: 'Cash Counter',                  applicableTo: 'Retail', description: 'Billing point.' },
    { id: 115, value: 'Stock Room',                    applicableTo: 'Retail', description: 'Backstock / inventory.' },
    { id: 116, value: 'Back Office',                   applicableTo: 'F&B, Retail, Hospitality & Leisure, Offices', description: 'Back-office / admin room.' },
    { id: 117, value: 'Staff Toilet',                  applicableTo: 'F&B, Retail, Hospitality & Leisure, Offices, Institutional', description: 'Staff-only WC.' },
    { id: 118, value: 'Staff Locker',                  applicableTo: 'F&B, Retail, Hospitality & Leisure, Offices, Institutional', description: 'Staff changing area.' },
  ],

  /* MasterPropertyTypeAssemblies — empty for now; populated in Phase 8.3.
     Each entry pairs a propertyType with which levels/zones/spaces apply.
     Format (when populated):
       {
         id, propertyType: 'Villa',
         levels: [{ levelLabel, levelType, levelOrder }],
         zones: [{ zoneRefId, levelLabel, displayLabel? }],
         spaces: [{ spaceRefId, zoneRefId, displayLabel? }]
       }
     The 'displayLabel' optional override allows e.g. Café "Bathroom" → "Customer Toilet"
     without forking a new library entry. */
  MasterPropertyTypeAssemblies: [],

  /* Phase 8.2.2 — Level Type vocabulary master.
     Editable list of label options for level slots in property type assemblies.
     Replaces the previously hardcoded dropdown (Ground/Upper/Lower/etc).
     Order top-to-bottom matches conventional architectural drawings: lowest level first. */
  MasterLevelTypes: [
    { id: 1,  value: 'Basement 2' },
    { id: 2,  value: 'Basement 1' },
    { id: 3,  value: 'Lower Ground Floor' },
    { id: 4,  value: 'Ground Floor' },
    { id: 5,  value: 'Upper Ground Floor' },
    { id: 6,  value: 'Mezzanine' },
    { id: 7,  value: 'First Floor' },
    { id: 8,  value: 'Second Floor' },
    { id: 9,  value: 'Third Floor' },
    { id: 10, value: 'Roof / Terrace' },
    { id: 11, value: 'Single Floor' },
  ],

  MasterElements: [
    // Wall Treatment (Living)
    { id: 1, value: 'Wall Paint', featureId: 1 },
    { id: 2, value: 'Wall Cladding', featureId: 1 },
    { id: 3, value: 'Wallpaper', featureId: 1 },
    // Flooring (Living)
    { id: 4, value: 'Marble', featureId: 2 },
    { id: 5, value: 'Engineered Wood', featureId: 2 },
    // Lighting (Living)
    { id: 6, value: 'Chandelier', featureId: 3 },
    { id: 7, value: 'Cove Lighting', featureId: 3 },
    { id: 8, value: 'Spotlights', featureId: 3 },
    // Wardrobe (Master Bedroom)
    { id: 9, value: 'Wardrobe Shutter', featureId: 8 },
    { id: 10, value: 'Wardrobe Internals', featureId: 8 },
    { id: 11, value: 'Wardrobe Handles', featureId: 8 },
    // Wall Tiling (Master Bath)
    { id: 12, value: 'Wall Tile - Field', featureId: 11 },
    { id: 13, value: 'Wall Tile - Accent', featureId: 11 },
    // Sanitary Ware (Master Bath)
    { id: 14, value: 'WC', featureId: 13 },
    { id: 15, value: 'Wash Basin', featureId: 13 },
    { id: 16, value: 'Faucets', featureId: 13 },
    // Cabinetry (Kitchen)
    { id: 17, value: 'Base Cabinets', featureId: 16 },
    { id: 18, value: 'Wall Cabinets', featureId: 16 },
    { id: 19, value: 'Tall Units', featureId: 16 },
    // === Phase 9.1.35 — Luxury Apartment elements ===
    // Main Living Room — Flooring (featureId 24)
    { id: 20, value: 'Italian Marble Slab',             featureId: 24 },
    { id: 21, value: 'Engineered Oak Plank',            featureId: 24 },
    { id: 22, value: 'Travertine Stone',                featureId: 24 },
    // Main Living Room — Wall Treatment (featureId 25)
    { id: 23, value: 'Veneer Panelling',                featureId: 25 },
    { id: 24, value: 'Fluted Wood',                     featureId: 25 },
    { id: 25, value: 'Stone Cladding (Travertine)',     featureId: 25 },
    { id: 26, value: 'Lime Wash Texture',               featureId: 25 },
    { id: 27, value: 'Wallpaper (Designer Print)',      featureId: 25 },
    // Main Living Room — False Ceiling (featureId 26)
    { id: 28, value: 'POP Box with Cove',               featureId: 26 },
    { id: 29, value: 'Wooden Slat Ceiling',             featureId: 26 },
    { id: 30, value: 'Stretch Fabric Ceiling',          featureId: 26 },
    // Main Living Room — Lighting (featureId 27)
    { id: 31, value: 'Designer Chandelier',             featureId: 27 },
    { id: 32, value: 'Cove Lighting (LED Strip)',       featureId: 27 },
    { id: 33, value: 'Recessed Spotlights',             featureId: 27 },
    { id: 34, value: 'Wall Sconces',                    featureId: 27 },
    { id: 35, value: 'Floor Lamps',                     featureId: 27 },
    { id: 36, value: 'Pendant Cluster',                 featureId: 27 },
    // Main Living Room — Sofa & Seating (featureId 29)
    { id: 37, value: '3+2+1 Sofa Set',                  featureId: 29 },
    { id: 38, value: 'L-Shaped Sofa',                   featureId: 29 },
    { id: 39, value: 'Accent Chairs',                   featureId: 29 },
    { id: 40, value: 'Ottomans',                        featureId: 29 },
    { id: 41, value: 'Settee / Daybed',                 featureId: 29 },
    // Main Living Room — Media / TV Joinery (featureId 30)
    { id: 42, value: 'TV Unit (Wall-mounted)',          featureId: 30 },
    { id: 43, value: 'Display Shelving',                featureId: 30 },
    { id: 44, value: 'Concealed Storage',               featureId: 30 },
    { id: 45, value: 'Speaker Niches',                  featureId: 30 },
    // Main Kitchen — Cabinetry (featureId 45)
    { id: 46, value: 'Base Cabinets',                   featureId: 45 },
    { id: 47, value: 'Wall Cabinets',                   featureId: 45 },
    { id: 48, value: 'Tall Pantry Units',               featureId: 45 },
    { id: 49, value: 'Open Display Shelves',            featureId: 45 },
    { id: 50, value: 'Corner Carousel',                 featureId: 45 },
    // Main Kitchen — Countertop (featureId 46)
    { id: 51, value: 'Italian Marble',                  featureId: 46 },
    { id: 52, value: 'Quartz (Caesarstone)',            featureId: 46 },
    { id: 53, value: 'Granite',                         featureId: 46 },
    { id: 54, value: 'Solid Surface (Corian)',          featureId: 46 },
    // Main Kitchen — Appliances (featureId 48)
    { id: 55, value: 'Built-in Oven',                   featureId: 48 },
    { id: 56, value: 'Microwave',                       featureId: 48 },
    { id: 57, value: 'Dishwasher',                      featureId: 48 },
    { id: 58, value: 'Refrigerator (French Door)',      featureId: 48 },
    { id: 59, value: 'Wine Chiller',                    featureId: 48 },
    { id: 60, value: 'Coffee Machine',                  featureId: 48 },
    { id: 61, value: 'Chimney / Hood',                  featureId: 48 },
    { id: 62, value: 'Hob (5-burner Gas)',              featureId: 48 },
    // Master Bedroom — Flooring (featureId 53)
    { id: 63, value: 'Engineered Wood',                 featureId: 53 },
    { id: 64, value: 'Carpet (Wool Loop)',              featureId: 53 },
    { id: 65, value: 'Marble Border + Wood Inset',      featureId: 53 },
    // Master Bedroom — Bed & Headboard (featureId 56)
    { id: 66, value: 'King Bed (Upholstered Headboard)', featureId: 56 },
    { id: 67, value: 'Platform Bed (Wood)',             featureId: 56 },
    { id: 68, value: 'Channel-tufted Headboard',        featureId: 56 },
    { id: 69, value: 'Padded Wall Panel Headboard',     featureId: 56 },
    // Master Bedroom — Lighting (featureId 58)
    { id: 70, value: 'Bedside Pendant Lights',          featureId: 58 },
    { id: 71, value: 'Reading Wall Sconces',            featureId: 58 },
    { id: 72, value: 'Ceiling Pendant',                 featureId: 58 },
    { id: 73, value: 'Cove Lighting',                   featureId: 58 },
    // Master Walk-in Wardrobe — Wardrobe Shutters (featureId 63)
    { id: 74, value: 'Veneer Shutter',                  featureId: 63 },
    { id: 75, value: 'Mirror Shutter',                  featureId: 63 },
    { id: 76, value: 'Lacquered Glass Shutter',         featureId: 63 },
    { id: 77, value: 'Cane / Rattan Insert Shutter',    featureId: 63 },
    // Master Walk-in Wardrobe — Wardrobe Internals (featureId 64)
    { id: 78, value: 'Hanging Rods',                    featureId: 64 },
    { id: 79, value: 'Pull-out Drawers',                featureId: 64 },
    { id: 80, value: 'Tie & Belt Rack',                 featureId: 64 },
    { id: 81, value: 'Velvet-lined Jewellery Trays',    featureId: 64 },
    { id: 82, value: 'LED Strip Lighting',              featureId: 64 },
    // Master Bathroom — Vanity Joinery (featureId 71)
    { id: 83, value: 'Double Vanity Counter',           featureId: 71 },
    { id: 84, value: 'Wall-mounted Vanity',             featureId: 71 },
    { id: 85, value: 'Vanity with Drawer Storage',      featureId: 71 },
    // Master Bathroom — Sanitary Ware (featureId 72)
    { id: 86, value: 'Wall-hung WC',                    featureId: 72 },
    { id: 87, value: 'Twin-flush WC',                   featureId: 72 },
    { id: 88, value: 'Counter-top Wash Basin',          featureId: 72 },
    { id: 89, value: 'Wall-mounted Mixer',              featureId: 72 },
    { id: 90, value: 'Rain Shower Head',                featureId: 72 },
    { id: 91, value: 'Hand Shower',                     featureId: 72 },
    // Master Bathroom — Shower Enclosure (featureId 73)
    { id: 92, value: 'Frameless Glass Cubicle',         featureId: 73 },
    { id: 93, value: 'Walk-in Glass Partition',         featureId: 73 },
    { id: 94, value: 'Sliding Glass Door',              featureId: 73 },
  ],

  /* ===== Element leaves — 5 sibling lists per Element ===== */
  MasterSpecifications: [
    { id: 1,  value: 'Asian Royale Aspira — Matte White',  elementId: 1,  unit: '—',     baseRate: '' },
    { id: 2,  value: 'Berger Silk Glamor — Off White',     elementId: 1,  unit: '—',     baseRate: '' },
    { id: 3,  value: 'Texture finish — Lime Wash',         elementId: 1,  unit: '—',     baseRate: '' },
    { id: 4,  value: 'Italian Marble — Statuario',         elementId: 4,  unit: 'sqft',  baseRate: '850' },
    { id: 5,  value: 'Indian Marble — Makrana',            elementId: 4,  unit: 'sqft',  baseRate: '320' },
    { id: 6,  value: 'Engineered Wood — Pergo Oak',        elementId: 5,  unit: 'sqft',  baseRate: '275' },
    { id: 7,  value: 'PU Lacquer — Matte White',           elementId: 9,  unit: 'sqft',  baseRate: '450' },
    { id: 8,  value: 'Veneer — Walnut Polished',           elementId: 9,  unit: 'sqft',  baseRate: '680' },
    { id: 9,  value: 'Laminate — Greenlam Marine',         elementId: 9,  unit: 'sqft',  baseRate: '180' },
    { id: 10, value: 'Kohler Veil — Wall Hung WC',         elementId: 14, unit: 'no',    baseRate: '42000' },
    { id: 11, value: 'Duravit Starck 3 — WC',              elementId: 14, unit: 'no',    baseRate: '38000' },
    { id: 12, value: 'Grohe Eurosmart — Mixer',            elementId: 16, unit: 'no',    baseRate: '8500' },
    { id: 13, value: 'Jaquar Continental — Mixer',         elementId: 16, unit: 'no',    baseRate: '4200' },
  ],
  MasterChecklists: [
    { id: 1, value: 'QA before delivery — joinery',  elementId: 9,  description: 'Inspection points before shutter leaves vendor.' },
    { id: 2, value: 'Site QC — sanitary fitment',    elementId: 14, description: 'Plumbing alignment, sealant quality, level.' },
    { id: 3, value: 'Stone quality — Italian marble',elementId: 4,  description: 'Slab inspection, vein matching, polish grade.' },
    { id: 4, value: 'Lighting circuit verification', elementId: 6,  description: 'Load test, dimmer compatibility, color temp match.' },
  ],
  MasterDrawings: [
    { id: 1, value: 'Floor Plan',  drawingType: 'Plan',     description: 'Standard scaled floor plan.' },
    { id: 2, value: 'RCP',         drawingType: 'Plan',     description: 'Reflected ceiling plan with lighting layout.' },
    { id: 3, value: 'Elevation',   drawingType: 'Elevation',description: 'Wall elevation with material callouts.' },
    { id: 4, value: 'Section',     drawingType: 'Section',  description: 'Cross-section through key areas.' },
    { id: 5, value: 'Joinery Detail', drawingType: 'Detail', description: 'Construction detail at 1:5 or 1:10.' },
    { id: 6, value: 'As-Built',    drawingType: 'As-Built', description: 'Final as-built drawing post-execution.' },
  ],
  MasterReferences: [
    { id: 1, value: 'Mood Image',         referenceType: 'Inspiration', description: 'Pinterest / Behance / Houzz reference image.' },
    { id: 2, value: 'Material Sample',    referenceType: 'Physical',    description: 'Physical sample provided by vendor.' },
    { id: 3, value: 'Vendor Catalogue',   referenceType: 'Catalogue',   description: 'Vendor product catalogue or PDF spec sheet.' },
    { id: 4, value: 'Site Photograph',    referenceType: 'Site',        description: 'Photo of existing site condition.' },
    { id: 5, value: 'Similar Project',    referenceType: 'Precedent',   description: 'Reference to a previous project completion.' },
  ],
  MasterBOQItems: [
    { id: 1, value: 'Wall Paint — 2 coat application', unit: 'sqft', baseRate: '18',  category: 'Finish' },
    { id: 2, value: 'Italian Marble flooring laid',     unit: 'sqft', baseRate: '950', category: 'Stone' },
    { id: 3, value: 'Engineered Wood flooring laid',    unit: 'sqft', baseRate: '320', category: 'Wood' },
    { id: 4, value: 'PU lacquer joinery — sprayed',     unit: 'sqft', baseRate: '480', category: 'Joinery' },
    { id: 5, value: 'Veneer joinery — finished',        unit: 'sqft', baseRate: '720', category: 'Joinery' },
    { id: 6, value: 'Wall tiling — installation',       unit: 'sqft', baseRate: '120', category: 'Tile' },
    { id: 7, value: 'False ceiling — gypsum',           unit: 'sqft', baseRate: '95',  category: 'Ceiling' },
    { id: 8, value: 'Cove lighting — installed',        unit: 'rft',  baseRate: '450', category: 'Lighting' },
  ],

  /* ---- Phase 4: Templates ---- */
  MasterProjectTemplates: [
    {
      id: 1, value: 'The Villa',
      linkedCategory: 'Home Owner', linkedPropertyType: 'Villa',
      linkedServiceType: 'Design + Build (Turnkey)',
      description: 'Full turnkey for 4-5 BHK villas. 12-month average build cycle.',
      includedScopeDefault: 'Full interior design, custom joinery, lighting design, soft furnishings, art curation, end-to-end procurement and execution.',
      excludedScopeDefault: 'Civil structural changes, exterior landscaping, smart home integration, swimming pool design.',
    },
    {
      id: 2, value: 'The Cafe Quick Build',
      linkedCategory: 'F&B', linkedPropertyType: 'Café',
      linkedServiceType: 'Design + Technical Drawing + Consultation + Procurement',
      description: '5-month standard café fitout from bare shell. Includes equipment specification.',
      includedScopeDefault: 'Layout design, joinery, lighting, signage, FF&E procurement, equipment specification, on-site supervision.',
      excludedScopeDefault: 'Civil works (handled by landlord), brand identity design, menu engineering.',
    },
    {
      id: 3, value: 'HQ',
      linkedCategory: 'Offices', linkedPropertyType: 'Corporate HQ/HO',
      linkedServiceType: 'Design + Technical Drawing + Consultation + Project Management',
      description: 'For 30,000+ sqft corporate spaces. Multi-floor phased delivery with PMC.',
      includedScopeDefault: 'Workplace strategy, space planning, design development, working drawings, BoQ, vendor management, project management with weekly reporting.',
      excludedScopeDefault: 'IT cabling design, AV integration, base-build modifications, security system integration.',
    },
    {
      id: 4, value: 'The Penthouse Premium Design',
      linkedCategory: 'Home Owner', linkedPropertyType: 'Penthouse',
      linkedServiceType: 'Design + Technical Drawing + Consultation',
      description: 'High-end penthouses. Design + technical only — client engages separate contractor.',
      includedScopeDefault: 'Concept design, design development, full working drawings, material specification, vendor recommendations, periodic site reviews (max 6 visits).',
      excludedScopeDefault: 'Procurement, on-site supervision, contractor coordination, BoQ negotiations.',
    },
    /* Phase 9.1.10 — 5th template: residential multi-phase build (e.g. multi-floor renovations,
       villa-by-villa rollouts, phased family-home upgrades). Distinct from Corporate HQ. */
    {
      id: 5, value: 'The Multi-phase',
      linkedCategory: 'Home Owner', linkedPropertyType: 'Villa',
      linkedServiceType: 'Design + Technical Drawing + Consultation + Project Management',
      description: 'Phased delivery across multiple floors / wings / buildings. Sequential handovers, longer timelines.',
      includedScopeDefault: 'Phase-wise design, working drawings per phase, BoQ per phase, vendor coordination across phases, sequential handover protocol, monthly reporting per phase.',
      excludedScopeDefault: 'Furniture procurement (FF&E), branded kitchen equipment, AV/smart home, exterior architecture changes.',
    },
  ],
  MasterPropertyTemplates: [
    { id: 1, value: '4BHK Villa Standard', linkedPropertyType: 'Villa', description: 'Standard 5-zone villa: public / private / wet / service / outdoor.' },
    { id: 2, value: 'Compact Café 1500-2000 sqft', linkedPropertyType: 'Café', description: 'Single-floor café with seating + counter + kitchen + back of house.' },
    { id: 3, value: 'Corporate HQ Multi-Floor', linkedPropertyType: 'Corporate HQ/HO', description: 'Multi-floor corporate: reception, workspace, meeting rooms, cabins, cafeteria, services.' },
    { id: 4, value: 'Sea-Facing Duplex Penthouse', linkedPropertyType: 'Penthouse', description: 'Duplex penthouse with terrace deck. Public + private + wet + outdoor.' },
    { id: 5, value: '2BHK Urban Flat', linkedPropertyType: 'Flat', description: 'Compact urban flat with public, private, wet zones.' },
  ],
  MasterWorkflowTemplates: [
    {
      id: 1, value: 'Standard Residential (Turnkey)',
      linkedServiceType: 'Design + Build (Turnkey)',
      description: 'Full turnkey residential — 11 stages with detailed activities under each.',
      stages: [
        { name: 'Onboarding',          activities: ['Kickoff & Briefing', 'Site Survey', 'Design Brief Capture'] },
        { name: 'Concept',             activities: ['Mood Boards', 'Layout Options', 'Material Direction', 'Volumetric 3D', 'Cost Envelope'] },
        { name: 'Design Development',  activities: ['Detailed Layouts', 'Material Library', 'Photoreal 3D', 'Joinery & Furniture Design', 'Lighting Plan'] },
        { name: 'Client Approval',     activities: [] },
        { name: 'Working Drawings',    activities: ['Architectural Drawings', 'Joinery Detail Drawings', 'MEP Coordination'] },
        { name: 'BOQ',                 activities: ['Quantity Take-off', 'Vendor Quotation', 'Final Costing'] },
        { name: 'Procurement',         activities: ['Vendor Selection', 'PO Issuance & Tracking', 'Sample Approvals'] },
        { name: 'Site Execution',      activities: ['Civil Works', 'Joinery Installation', 'Finishes & Painting', 'MEP Installation', 'FF&E Install & Styling'] },
        { name: 'Snag List',           activities: ['Snag Walkthrough', 'Snag Closure'] },
        { name: 'Handover',            activities: ['Documentation Handover', 'Final Photoshoot'] },
        { name: 'Completed',           activities: [] },
      ],
    },
    {
      id: 2, value: 'Café Fast-Track',
      linkedServiceType: 'Design + Technical Drawing + Consultation + Procurement',
      description: '8-stage compressed timeline for café fitouts.',
      stages: [
        { name: 'Onboarding',          activities: ['Kickoff & Briefing', 'Site Survey'] },
        { name: 'Concept',             activities: ['Mood Boards', 'Layout Options', 'Cost Envelope'] },
        { name: 'Design Development',  activities: ['Detailed Layouts', 'Material Library', 'Joinery & Furniture Design'] },
        { name: 'Working Drawings',    activities: ['Architectural Drawings', 'Joinery Detail Drawings'] },
        { name: 'BOQ',                 activities: ['Quantity Take-off', 'Final Costing'] },
        { name: 'Procurement',         activities: ['Vendor Selection', 'PO Issuance & Tracking'] },
        { name: 'Snag List',           activities: ['Snag Walkthrough', 'Snag Closure'] },
        { name: 'Handover',            activities: ['Documentation Handover'] },
      ],
    },
    {
      id: 3, value: 'Corporate Multi-Phase',
      linkedServiceType: 'Design + Technical Drawing + Consultation + Project Management',
      description: '12 stages with phased site delivery for large corporate projects.',
      stages: [
        { name: 'Onboarding',          activities: ['Kickoff & Briefing', 'Site Survey', 'Design Brief Capture'] },
        { name: 'Concept',             activities: ['Mood Boards', 'Layout Options', 'Volumetric 3D', 'Cost Envelope'] },
        { name: 'Design Development',  activities: ['Detailed Layouts', 'Material Library', 'Photoreal 3D', 'Lighting Plan'] },
        { name: 'Client Approval',     activities: [] },
        { name: 'Working Drawings',    activities: ['Architectural Drawings', 'Joinery Detail Drawings', 'MEP Coordination'] },
        { name: 'BOQ',                 activities: ['Quantity Take-off', 'Vendor Quotation', 'Final Costing'] },
        { name: 'Phase 1 Site',        activities: [] },
        { name: 'Phase 2 Site',        activities: [] },
        { name: 'Phase 3 Site',        activities: [] },
        { name: 'Snag List',           activities: [] },
        { name: 'Handover',            activities: ['Documentation Handover', 'Final Photoshoot'] },
      ],
    },
    {
      id: 4, value: 'Design-Only Package',
      linkedServiceType: 'Design + Technical Drawing + Consultation',
      description: '6 stages — studio delivers up to working drawings, execution by others.',
      stages: [
        { name: 'Onboarding',          activities: ['Kickoff & Briefing', 'Site Survey', 'Design Brief Capture'] },
        { name: 'Concept',             activities: ['Mood Boards', 'Layout Options', 'Material Direction', 'Cost Envelope'] },
        { name: 'Design Development',  activities: ['Detailed Layouts', 'Material Library', 'Photoreal 3D', 'Joinery & Furniture Design', 'Lighting Plan'] },
        { name: 'Client Approval',     activities: [] },
        { name: 'Working Drawings',    activities: ['Architectural Drawings', 'Joinery Detail Drawings', 'MEP Coordination'] },
        { name: 'Handover',            activities: ['Documentation Handover'] },
      ],
    },
  ],
  MasterTaskChecklists: [
    {
      id: 1, value: 'Onboarding Kickoff', linkedActivity: 'Kickoff & Briefing',
      description: 'Pre-kickoff prep before first client meeting.',
      items: ['Send welcome packet', 'Share project portal access', 'Schedule kickoff call', 'Collect signed contract', 'Brief design team internally'],
    },
    {
      id: 2, value: 'Site Measurement Protocol', linkedActivity: 'Site Survey',
      description: 'Standard site measurement and survey checklist.',
      items: ['Schedule measurement window with client', 'Coordinate with PM and architect', 'Record floor-plate dimensions', 'Photograph existing condition', 'Mark service entries and shafts', 'Verify ceiling heights at multiple points', 'Note structural columns and beams'],
    },
    {
      id: 3, value: 'Mood Board Production', linkedActivity: 'Mood Boards',
      description: 'Internal review before showing concept to client.',
      items: ['Source 30+ reference images per direction', 'Compose 3 boards in InDesign', 'Print A3 quality', 'Material samples physically attached', 'Walkthrough rehearsed with PM'],
    },
    {
      id: 4, value: 'BOQ Finalization', linkedActivity: 'Final Costing',
      description: 'Client-ready BOQ before sending.',
      items: ['Quantities verified by site team', 'Vendor quotes attached and current', 'Markup applied per contract', 'BOQ peer-reviewed by senior designer', 'Client-formatted version prepared', 'Variance from concept estimate explained'],
    },
    {
      id: 5, value: 'Pre-Handover Walkthrough', linkedActivity: 'Documentation Handover',
      description: 'Final walkthrough before handing over to client.',
      items: ['All snags closed and signed off', 'Deep cleaning complete', 'Furniture installed and styled', 'Final professional photoshoot completed', 'Warranty documents prepped', 'Client briefed on maintenance protocol', 'Keys handover'],
    },
    {
      id: 6, value: 'Procurement Tracking', linkedActivity: 'PO Issuance & Tracking',
      description: 'Weekly procurement coordination.',
      items: ['Lead-time tracker updated', 'Vendor PO confirmations received', 'Site delivery slots booked', 'QC inspection scheduled at vendor end', 'Damage protocol agreed in writing'],
    },
    /* Phase 9.1.22 — Onboarding-stage activity checklists so newly created
       projects show usable checklists end-to-end. Names below match the
       activity names emitted by MasterStageActivities for new wizard projects. */
    {
      id: 7, value: 'Team & Workflow Setup Protocol', linkedActivity: 'Team & Workflow Setup',
      description: 'Lock the project team and workflow before kickoff.',
      items: ['Project team picked and confirmed', 'Lead designer named', 'Site manager assigned', 'Studio internal calendar updated', 'Slack/WhatsApp channel created and members added', 'Project folder structure set up in Drive', 'Workflow template (stages + activities) loaded'],
    },
    {
      id: 8, value: 'Initial Client Brief Capture', linkedActivity: 'Initial Client Brief Meeting',
      description: 'Capture client priorities and constraints from the first meeting.',
      items: ['Brief meeting scheduled and confirmed', 'Brief questionnaire shared 24 hrs before', 'Lifestyle and family-pattern notes captured', 'Aesthetic references collected', 'Budget envelope discussed and recorded', 'Timeline expectations recorded', 'Decision-makers and approval flow mapped', 'Brief minutes shared with client and signed off'],
    },
    {
      id: 9, value: 'Scope & Commercial Alignment', linkedActivity: 'Scope & Commercial Alignment',
      description: 'Lock scope inclusions/exclusions and commercials before contract.',
      items: ['Scope inclusion list drafted', 'Scope exclusion list drafted', 'Phasing plan documented (if applicable)', 'Total project value agreed in principle', 'Payment milestone schedule shared', 'Procurement responsibility (Studio / Client / Hybrid) confirmed', 'Execution responsibility confirmed', 'Contract draft circulated for review'],
    },
    {
      id: 10, value: 'Site Information Collection', linkedActivity: 'Site Information Collection',
      description: 'Collect site documentation before measurement.',
      items: ['Existing CAD/PDF drawings collected', 'Society NOC and rules collected', 'Working hours and access-window noted', 'Material lift / hoist availability confirmed', 'Power and water availability for site team confirmed', 'Existing fixtures/utilities photographed', 'Site contact (security, society, neighbour) noted'],
    },
    {
      id: 11, value: 'Kickoff & Alignment Protocol', linkedActivity: 'Kickoff & Alignment',
      description: 'Internal + client kickoff to align on next 4 weeks.',
      items: ['Kickoff agenda circulated 48 hrs ahead', 'Roles and responsibilities walked through', 'Project portal demo to client', 'Communication protocol agreed (channels, frequency)', 'Approval timeline expectation set', 'Risks and dependencies discussed', 'Kickoff minutes signed and filed'],
    },
  ],
  MasterPaymentMilestones: [
    {
      id: 1, value: 'Standard 6-stage Residential',
      linkedServiceType: 'Design + Build (Turnkey)',
      description: '10 / 15 / 20 / 20 / 25 / 10 — engagement fee → signing advance → design milestones → procurement → handover.',
      milestones: [
        /* Phase 9.0.2 — First Advance (token engagement fee) added before Signing advance */
        { name: 'First Advance / Engagement Fee', linkedStage: 'Onboarding', percentage: '10', triggerCondition: 'On verbal agreement / project commitment', reminderEnabled: false, reminderType: 'WhatsApp' },
        { name: 'Signing Advance', linkedStage: 'Onboarding', percentage: '15', triggerCondition: 'On signed contract', reminderEnabled: false, reminderType: 'WhatsApp' },
        { name: 'Concept Signoff', linkedStage: 'Concept', percentage: '20', triggerCondition: 'On client approval', reminderEnabled: true, reminderType: 'WhatsApp' },
        { name: 'DD Signoff', linkedStage: 'Design Development', percentage: '20', triggerCondition: 'On stage completion', reminderEnabled: true, reminderType: 'Email' },
        { name: 'Procurement Release', linkedStage: 'Procurement', percentage: '25', triggerCondition: 'On stage start', reminderEnabled: true, reminderType: 'WhatsApp' },
        { name: 'Handover', linkedStage: 'Handover', percentage: '10', triggerCondition: 'On stage completion', reminderEnabled: true, reminderType: 'Email' },
      ],
    },
    {
      id: 2, value: 'Café 4-stage Build',
      linkedServiceType: 'Design + Technical Drawing + Consultation + Procurement',
      description: '20 / 40 / 30 / 10 — café fast-track.',
      milestones: [
        { name: 'Signing advance', linkedStage: 'Onboarding', percentage: '20', triggerCondition: 'On signed contract', reminderEnabled: true, reminderType: 'WhatsApp' },
        { name: 'Concept + DD', linkedStage: 'Design Development', percentage: '40', triggerCondition: 'On stage completion', reminderEnabled: true, reminderType: 'Email' },
        { name: 'Working drawings', linkedStage: 'Working Drawings', percentage: '30', triggerCondition: 'On stage completion', reminderEnabled: true, reminderType: 'Email' },
        { name: 'Handover', linkedStage: 'Handover', percentage: '10', triggerCondition: 'On stage completion', reminderEnabled: true, reminderType: 'WhatsApp' },
      ],
    },
    {
      id: 3, value: 'Corporate 6-stage Phased',
      linkedServiceType: 'Design + Technical Drawing + Consultation + Project Management',
      description: '10 / 20 / 20 / 30 / 10 / 10 with multi-phase site billing.',
      milestones: [
        { name: 'Signing advance', linkedStage: 'Onboarding', percentage: '10', triggerCondition: 'On signed contract', reminderEnabled: false, reminderType: 'Email' },
        { name: 'Concept signoff', linkedStage: 'Concept', percentage: '20', triggerCondition: 'On client approval', reminderEnabled: true, reminderType: 'Email' },
        { name: 'DD complete', linkedStage: 'Design Development', percentage: '20', triggerCondition: 'On stage completion', reminderEnabled: true, reminderType: 'Email' },
        { name: 'Site mobilization', linkedStage: 'Site Execution', percentage: '30', triggerCondition: 'On stage start', reminderEnabled: true, reminderType: 'Email' },
        { name: 'Phased site progress', linkedStage: 'Site Execution', percentage: '10', triggerCondition: 'On stage completion', reminderEnabled: true, reminderType: 'Email' },
        { name: 'Handover', linkedStage: 'Handover', percentage: '10', triggerCondition: 'On stage completion', reminderEnabled: true, reminderType: 'Email' },
      ],
    },
    {
      id: 4, value: 'Design-Only 3-stage',
      linkedServiceType: 'Design + Technical Drawing + Consultation',
      description: '30 / 40 / 30 — design package only.',
      milestones: [
        { name: 'Signing advance', linkedStage: 'Onboarding', percentage: '30', triggerCondition: 'On signed contract', reminderEnabled: false, reminderType: 'WhatsApp' },
        { name: 'DD signoff', linkedStage: 'Design Development', percentage: '40', triggerCondition: 'On client approval', reminderEnabled: true, reminderType: 'Email' },
        { name: 'Working drawings handover', linkedStage: 'Handover', percentage: '30', triggerCondition: 'On stage completion', reminderEnabled: true, reminderType: 'Email' },
      ],
    },
    {
      id: 5, value: 'Styling Only 50/50',
      linkedServiceType: 'Design + Technical Drawing + Consultation + Procurement',
      description: '50 / 50 — quick styling and procurement.',
      milestones: [
        { name: 'Procurement advance', linkedStage: 'Procurement', percentage: '50', triggerCondition: 'On stage start', reminderEnabled: false, reminderType: 'WhatsApp' },
        { name: 'Final styling', linkedStage: 'Handover', percentage: '50', triggerCondition: 'On stage completion', reminderEnabled: true, reminderType: 'WhatsApp' },
      ],
    },
  ],

  /* ---- Move 1: Team members (drives Project Card pm/initials/accent) ---- */
  MasterTeamMembers: [
    { id: 1, value: 'Aanya Sharma',  role: 'Founder & Principal', initials: 'AS', accent: '#1A1815', email: 'aanya@studio.in',
      tier: 'Admin', dept: 'MGT', status: 'Active', reportsTo: '', capDay: '8h', hoursLoad: 'Always',
      mobile: '+91 98200 11111', personalEmail: 'aanya.sharma@gmail.com', workPhone: '+91 22 4040 1100', fathersName: 'Mr. Rajesh Sharma', dob: '1985-04-12', dateOfJoining: '2017-06-01',
      address: '14B Jaybharat Apartments, Bandra West, Mumbai 400050', emergencyContactName: 'Rajesh Sharma (father)', emergencyContactPhone: '+91 98765 11111',
      aadhaar: '6342 8821 4471', pan: 'AKLPS1234N',
      accountHolderName: 'Aanya Sharma', bankName: 'HDFC Bank', accountNumber: '50100456789012', ifsc: 'HDFC0001234', branch: 'Bandra West',
      responsibilities: ['Studio direction & client relationships', 'Final design signoffs', 'New business + contract negotiation'],
      otherLinks: [{ label: 'LinkedIn', url: 'https://linkedin.com/in/aanya-sharma' }, { label: 'Studio website bio', url: 'https://studio.in/team/aanya' }],
      tools: [{ name: 'Google Workspace', username: 'aanya@studio.in', password: 'StudioOwner!2024' }, { name: 'Figma', username: 'aanya@studio.in', password: 'figma-aanya-2024' }, { name: '1Password', username: 'aanya@studio.in', password: '••• stored in 1Password itself' }] },
    { id: 2, value: 'Riya Sharma',   role: 'Senior Project Manager', initials: 'RS', accent: '#B4593C', email: 'riya@studio.in',
      tier: 'Manager', dept: 'MGT', status: 'Active', reportsTo: 'AS', capDay: '8h', hoursLoad: 'Always',
      mobile: '+91 98200 22222', personalEmail: 'riya.sharma22@gmail.com', workPhone: '+91 22 4040 1101', fathersName: '', dob: '1990-09-17', dateOfJoining: '2019-03-15',
      address: 'A-301 Kalpataru Aura, Ghatkopar West, Mumbai 400084', emergencyContactName: 'Anjali Sharma (sister)', emergencyContactPhone: '+91 98765 22222',
      aadhaar: '7821 9982 0034', pan: 'BNXPS5678M',
      accountHolderName: 'Riya Sharma', bankName: 'ICICI Bank', accountNumber: '028801509231', ifsc: 'ICIC0000288', branch: 'Ghatkopar',
      responsibilities: ['Day-to-day project execution across portfolio', 'Client communication + meeting coordination', 'Vendor management for active projects'],
      otherLinks: [{ label: 'LinkedIn', url: 'https://linkedin.com/in/riya-sharma' }],
      tools: [{ name: 'Asana', username: 'riya@studio.in', password: 'AsanaRiya!Pm' }, { name: 'Slack', username: 'riya@studio.in', password: 'shared-via-sso' }] },
    { id: 3, value: 'Meher Kapoor',  role: 'Senior Designer', initials: 'MK', accent: '#6B7355', email: 'meher@studio.in',
      tier: 'Manager', dept: 'DSN', status: 'Active', reportsTo: 'AS', capDay: '8h', hoursLoad: 'Always',
      mobile: '+91 98200 33333', personalEmail: 'meher.kapoor@gmail.com', workPhone: '+91 22 4040 1102', fathersName: '', dob: '1988-11-23', dateOfJoining: '2018-08-20',
      address: '7th Floor Lodha Bellissimo, Mahalaxmi, Mumbai 400011', emergencyContactName: 'Vikram Kapoor (husband)', emergencyContactPhone: '+91 98765 33333',
      aadhaar: '4419 6628 7710', pan: 'CKLPK9101P',
      accountHolderName: 'Meher Kapoor', bankName: 'HDFC Bank', accountNumber: '50100789456123', ifsc: 'HDFC0000456', branch: 'Mahalaxmi',
      responsibilities: ['Concept + design development for residential portfolio', 'Material library + finish selections', 'Junior designer mentorship'],
      otherLinks: [{ label: 'Behance', url: 'https://behance.net/meher-kapoor' }, { label: 'Pinterest', url: 'https://pinterest.com/mkapoor' }],
      tools: [{ name: 'Figma', username: 'meher@studio.in', password: 'FigmaSenior2024' }, { name: 'AutoCAD', username: 'meher.kapoor', password: 'autodesk-mk-2024' }, { name: 'SketchUp Pro', username: 'meher@studio.in', password: '' }] },
    { id: 4, value: 'Devansh Iyer',  role: 'Site Manager', initials: 'DI', accent: '#A67C5A', email: 'devansh@studio.in',
      tier: 'Manager', dept: 'SITE', status: 'Active', reportsTo: 'RS', capDay: '8h', hoursLoad: 'Always',
      mobile: '+91 98200 44444', personalEmail: 'd.iyer.site@gmail.com', workPhone: '', fathersName: '', dob: '1987-02-08', dateOfJoining: '2020-01-10',
      address: 'B-12 Hiranandani Estate, Thane West, Thane 400607', emergencyContactName: 'Lakshmi Iyer (mother)', emergencyContactPhone: '+91 98765 44444',
      aadhaar: '8829 1144 5567', pan: 'DKMPI2345R',
      accountHolderName: 'Devansh Iyer', bankName: 'Kotak Mahindra Bank', accountNumber: '07890011223344', ifsc: 'KKBK0000789', branch: 'Thane',
      responsibilities: ['On-site execution coordination + vendor management', 'Site progress photos and weekly site updates', 'Snag list compilation + tracking'],
      otherLinks: [],
      tools: [{ name: 'WhatsApp Business', username: 'Devansh - Studio', password: 'OTP via SIM only' }, { name: 'CamScanner', username: 'devansh@studio.in', password: 'cam-scan-d-2024' }] },
    { id: 5, value: 'Sandeep Mehta', role: 'Studio Accountant', initials: 'SM', accent: '#D69544', email: 'finance@studio.in',
      tier: 'Manager', dept: 'ACC', status: 'Active', reportsTo: 'AS', capDay: '8h', hoursLoad: 'Always',
      mobile: '+91 98200 55555', personalEmail: 'sandeep.m.acc@gmail.com', workPhone: '+91 22 4040 1105', fathersName: '', dob: '1982-06-30', dateOfJoining: '2018-11-05',
      address: 'C-405 Shree Sai Heights, Andheri East, Mumbai 400069', emergencyContactName: 'Priya Mehta (wife)', emergencyContactPhone: '+91 98765 55555',
      aadhaar: '5511 7733 9921', pan: 'EPLPM6789Q',
      accountHolderName: 'Sandeep Mehta', bankName: 'SBI', accountNumber: '20109876543210', ifsc: 'SBIN0000209', branch: 'Andheri East',
      responsibilities: ['Project P&L + monthly studio finances', 'GST + TDS compliance', 'Vendor payment processing + invoice management'],
      otherLinks: [],
      tools: [{ name: 'Tally Prime', username: 'sandeep@studio.in', password: 'Tally!Acc2024' }, { name: 'Zoho Books', username: 'finance@studio.in', password: 'ZohoFinance!24' }] },
    { id: 6, value: 'Karan Bhatia',  role: 'Junior Designer', initials: 'KB', accent: '#7A4A4A', email: 'karan@studio.in',
      tier: 'Doer', dept: 'DSN', status: 'Active', reportsTo: 'MK', capDay: '8h', hoursLoad: '—',
      mobile: '+91 98200 66666', personalEmail: 'karanbhatia.design@gmail.com', workPhone: '', fathersName: '', dob: '1996-12-04', dateOfJoining: '2023-04-01',
      address: 'D-201 Yash Heights, Powai, Mumbai 400076', emergencyContactName: 'Mohan Bhatia (father)', emergencyContactPhone: '+91 98765 66666',
      aadhaar: '', pan: '',
      accountHolderName: 'Karan Bhatia', bankName: 'Axis Bank', accountNumber: '912010012345678', ifsc: 'UTIB0000123', branch: 'Powai',
      responsibilities: ['Concept boards + 3D visualisations', 'Material samples + supplier coordination', 'Drawing redlines for senior review'],
      otherLinks: [{ label: 'Behance', url: 'https://behance.net/karan-b' }],
      tools: [{ name: 'Figma', username: 'karan@studio.in' }, { name: 'SketchUp', username: 'karan.bhatia' }, { name: 'Lumion', username: 'karan@studio.in' }] },
    { id: 7, value: 'Pooja Desai',   role: 'Junior Designer', initials: 'PD', accent: '#9C5A1F', email: 'pooja@studio.in',
      tier: 'Doer', dept: 'DSN', status: 'Active', reportsTo: 'MK', capDay: '8h', hoursLoad: '—',
      mobile: '+91 98200 77777', personalEmail: 'pooja.desai.studio@gmail.com', workPhone: '', fathersName: '', dob: '1997-07-21', dateOfJoining: '2023-09-18',
      address: '12 Sea Bird Co-op, Khar West, Mumbai 400052', emergencyContactName: 'Aarti Desai (mother)', emergencyContactPhone: '+91 98765 77777',
      aadhaar: '', pan: '',
      accountHolderName: 'Pooja Desai', bankName: 'HDFC Bank', accountNumber: '50100234567890', ifsc: 'HDFC0001456', branch: 'Khar',
      responsibilities: ['Detailed working drawings + material schedules', 'Supplier sample sourcing + cataloguing', 'Mood boards + reference compilation'],
      otherLinks: [],
      tools: [{ name: 'Figma', username: 'pooja@studio.in' }, { name: 'AutoCAD', username: 'pooja.desai' }] },
    { id: 8, value: 'Anish Rao',     role: 'Draftsperson', initials: 'AR', accent: '#0050E5', email: 'anish@studio.in',
      tier: 'Doer', dept: 'DSN', status: 'Active', reportsTo: 'MK', capDay: '8h', hoursLoad: '—',
      mobile: '+91 98200 88888', personalEmail: 'anish.rao.cad@gmail.com', workPhone: '', fathersName: '', dob: '1989-03-14', dateOfJoining: '2021-07-12',
      address: 'B-7 Sai Leela Apartments, Vile Parle East, Mumbai 400057', emergencyContactName: 'Sushma Rao (wife)', emergencyContactPhone: '+91 98765 88888',
      aadhaar: '', pan: '',
      accountHolderName: 'Anish Rao', bankName: 'Canara Bank', accountNumber: '0418123456789', ifsc: 'CNRB0000418', branch: 'Vile Parle',
      responsibilities: ['Working drawings — plans/elevations/sections/details', 'GFC drawing sets + revisions', 'CAD library + standards maintenance'],
      otherLinks: [],
      tools: [{ name: 'AutoCAD LT', username: 'anish.rao' }, { name: 'Revit', username: 'anish@studio.in' }] },
    { id: 9, value: 'Pratik Joshi',  role: 'Site Supervisor', initials: 'PJ', accent: '#6B7355', email: 'pratik@studio.in',
      tier: 'Doer', dept: 'SITE', status: 'Active', reportsTo: 'DI', capDay: '8h', hoursLoad: '—',
      mobile: '+91 98200 99999', personalEmail: 'pratikjoshi.site@gmail.com', workPhone: '', fathersName: '', dob: '1991-08-29', dateOfJoining: '2022-02-01',
      address: '14 Kapadia Chawl, Ghatkopar East, Mumbai 400077', emergencyContactName: 'Ramesh Joshi (father)', emergencyContactPhone: '+91 98765 99999',
      aadhaar: '', pan: '',
      accountHolderName: 'Pratik Joshi', bankName: 'Bank of Baroda', accountNumber: '34560011223344', ifsc: 'BARB0GHATKO', branch: 'Ghatkopar',
      responsibilities: ['Daily site supervision — vendor coordination on the ground', 'Material receipt + quality check at site', 'Site safety + worker management'],
      otherLinks: [],
      tools: [{ name: 'WhatsApp', username: 'Pratik Joshi' }] },
    { id: 10, value: 'Neha Pillai',  role: 'Operations Admin', initials: 'NP', accent: '#A67C5A', email: 'ops@studio.in',
      tier: 'Doer', dept: 'OPS', status: 'Active', reportsTo: 'AS', capDay: '8h', hoursLoad: '—',
      mobile: '+91 98201 00000', personalEmail: 'neha.pillai.ops@gmail.com', workPhone: '+91 22 4040 1110', fathersName: '', dob: '1993-05-11', dateOfJoining: '2022-10-03',
      address: 'A-1502 Lodha Splendora, Thane West, Thane 400607', emergencyContactName: 'Suresh Pillai (husband)', emergencyContactPhone: '+91 98766 00000',
      aadhaar: '', pan: '',
      accountHolderName: 'Neha Pillai', bankName: 'ICICI Bank', accountNumber: '028901667321', ifsc: 'ICIC0000289', branch: 'Thane',
      responsibilities: ['Studio admin — meeting scheduling, courier, supplies', 'Vendor PO follow-up + payment tracking handoff', 'New project onboarding setup + folder creation'],
      otherLinks: [],
      tools: [{ name: 'Google Calendar', username: 'ops@studio.in' }, { name: 'Slack', username: 'neha@studio.in' }] },
    { id: 11, value: 'Aryan Khanna', role: 'Design Intern', initials: 'AK', accent: '#D69544', email: 'intern@studio.in',
      tier: 'Intern', dept: 'DSN', status: 'Active', reportsTo: 'MK', capDay: '6h', hoursLoad: '—',
      mobile: '+91 98201 11111', personalEmail: 'aryankh.designstudent@gmail.com', workPhone: '', fathersName: '', dob: '2002-10-27', dateOfJoining: '2026-01-15',
      address: 'BIT Hostel Block C-204, Pune 411037', emergencyContactName: 'Vikas Khanna (father)', emergencyContactPhone: '+91 98766 11111',
      aadhaar: '', pan: '',
      accountHolderName: '', bankName: '', accountNumber: '', ifsc: '', branch: '',
      responsibilities: ['Design assistant — boards, presentations, sample compilation', '6-month internship — graduating SID Bangalore'],
      otherLinks: [{ label: 'Portfolio', url: 'https://aryankhanna.studio' }],
      tools: [{ name: 'Figma (free)', username: 'aryan@gmail.com' }] },
  ],

  /* ====================================================================
     MasterClients (Phase 5.6) — first-class client master.
     Each project references one client by primaryClientId.
     Bidirectional: edit master → all projects show new value.
     Excludes PII (Aadhaar/PAN) per architectural decision.
  ==================================================================== */
  MasterClients: [
    { id: 1, value: 'Aakash Marwah', initials: 'AM', accent: '#B4593C',
      clientType: 'individual',
      primaryContact: '+91 98201 12345', primaryEmail: 'aakash@marwah.in',
      secondaryContactName: 'Naina Marwah (wife)', secondaryContactNumber: '+91 98201 12399', secondaryEmail: 'naina@marwah.in',
      address: 'Bandra West, Mumbai',
      flags: ['VIP'], notes: 'Original brief was contemporary; family pushed for warmer materials at concept.', createdOn: '2025-12-01' },
    { id: 2, value: 'Karan Vij', initials: 'KV', accent: '#6B7355',
      clientType: 'individual',
      primaryContact: '+91 98330 44556', primaryEmail: 'karan@kavi.coffee',
      secondaryContactName: '', secondaryContactNumber: '', secondaryEmail: '',
      address: 'Linking Road, Mumbai',
      flags: ['Repeat client', 'Fast decisions'], notes: 'Owns Kavi Coffee chain — 3 outlets currently, expanding to 6 by 2027. Fast decision-maker.', createdOn: '2026-01-08' },
    { id: 3, value: 'Vikram Saraf', initials: 'VS', accent: '#7A4A4A',
      clientType: 'individual',
      primaryContact: '+91 98191 33445', primaryEmail: 'vikram@sarafgrp.com',
      secondaryContactName: 'Priti Saraf (wife)', secondaryContactNumber: '+91 98191 33455', secondaryEmail: '',
      address: 'Lodha Park, Worli, Mumbai',
      flags: ['Loves vintage materials'], notes: 'Family-run jewellery business. Wife is interior taste-maker.', createdOn: '2025-09-22' },
    { id: 4, value: 'Tata Capital Ltd', initials: 'TC', accent: '#0A2540',
      clientType: 'organization',
      primaryContact: '+91 22 6606 1500', primaryEmail: 'pranav.desai@tatacapital.com',
      secondaryContactName: 'Pranav Desai (Head, Workplace Strategy)', secondaryContactNumber: '+91 22 6606 1501', secondaryEmail: '',
      address: '11th Floor, Lodha Excelus, Mumbai',
      flags: ['Procurement-driven', 'Slow approvals'], notes: 'Decisions go through Workplace Strategy + Facilities. Single sign-off rare.', createdOn: '2025-08-15' },
    { id: 5, value: 'Hiranandani Communities', initials: 'HC', accent: '#B4593C',
      clientType: 'organization',
      primaryContact: '+91 22 2576 6464', primaryEmail: 'sanjay@hiranandani.in',
      secondaryContactName: 'Sanjay Hiranandani (Director)', secondaryContactNumber: '+91 22 2576 6464', secondaryEmail: 'sanjay@hiranandani.in',
      address: 'Hiranandani Estate, Thane',
      flags: ['Payment person different'], notes: 'Director signs off on design; finance team handles payments separately.', createdOn: '2025-11-18' },
    { id: 6, value: 'Aditi Singhania', initials: 'AS', accent: '#7A4A4A',
      clientType: 'individual',
      primaryContact: '+91 98203 77889', primaryEmail: 'aditi@singhaniagrp.com',
      secondaryContactName: '', secondaryContactNumber: '', secondaryEmail: '',
      address: 'Singhania Towers, Lower Parel',
      flags: [], notes: 'Family business — manages Singhania Group. Tower fitout for new HQ.', createdOn: '2025-10-30' },
    { id: 7, value: 'Arjun & Sara Khanna', initials: 'AK', accent: '#8B6F47',
      clientType: 'individual',
      primaryContact: '+91 98201 99887', primaryEmail: 'arjun@khannafamily.in',
      secondaryContactName: 'Sara Khanna (wife)', secondaryContactNumber: '+91 98201 99888', secondaryEmail: 'sara@khannafamily.in',
      address: 'Pali Hill, Bandra West, Mumbai',
      flags: ['VIP', 'Repeat client'], notes: 'Returning client. Earlier did Khanna Vacation Home in Goa with us in 2023. Arjun runs a private equity firm; Sara is an art collector. Strong eye for materials, decisive.', createdOn: '2025-11-15' },
  ],

  /* ====================================================================
     MasterVendors (Phase 5.6) — first-class vendor master.
     Project-specific role lives on project (in externalStakeholders entries).
     Vendor identity, contact, and trades live here.
  ==================================================================== */
  MasterVendors: [
    { id: 1, value: 'Atlas Build Co.', initials: 'AB', accent: '#1A1815',
      vendorType: 'Contractor',
      primaryContact: '+91 90040 11122', primaryEmail: 'projects@atlasbuild.in',
      gstin: '27AABCA1234L1ZX', tradesProvided: ['Civil', 'Joinery', 'Finishing'],
      notes: 'Reliable for residential turnkey. Civil + finishing in-house, joinery via subcontract.', createdOn: '2024-06-10' },
    { id: 2, value: 'Lumina Lighting', initials: 'LL', accent: '#D69544',
      vendorType: 'Consultant',
      primaryContact: '+91 98700 23456', primaryEmail: 'studio@luminalight.in',
      gstin: '27AAACL5678M1ZQ', tradesProvided: ['Lighting Design', 'Lighting Spec'],
      notes: 'Lighting consultancy — selection + reflected ceiling. Premium work, slow timelines.', createdOn: '2024-08-12' },
    { id: 3, value: 'Espresso Italia', initials: 'EI', accent: '#A67C5A',
      vendorType: 'Supplier',
      primaryContact: '+91 22 4040 1212', primaryEmail: 'sales@espressoitalia.in',
      gstin: '27AABCE9012P1ZK', tradesProvided: ['Coffee Equipment', 'Bar Equipment'],
      notes: 'Specialty supplier for cafés — espresso machines, grinders, bar gear.', createdOn: '2025-01-22' },
    { id: 4, value: 'Cushman & Wakefield', initials: 'CW', accent: '#0A2540',
      vendorType: 'PMC',
      primaryContact: '', primaryEmail: 'india.pmc@cushwake.com',
      gstin: '07AABCC3456N1ZM', tradesProvided: ['Project Management', 'Procurement Advisory'],
      notes: 'PMC for large corporate fitouts. Manages on behalf of corporate clients.', createdOn: '2024-03-05' },
    { id: 5, value: 'Shapoorji Pallonji', initials: 'SP', accent: '#6B7355',
      vendorType: 'Contractor',
      primaryContact: '', primaryEmail: 'projects@spcl.com',
      gstin: '27AABCS7890Q1ZN', tradesProvided: ['Civil', 'MEP', 'Site Execution'],
      notes: 'Tier-1 contractor — typically used by developer clients (Hiranandani, Lodha).', createdOn: '2024-05-18' },
    { id: 6, value: 'Studio Acoustics', initials: 'SA', accent: '#7A4A4A',
      vendorType: 'Consultant',
      primaryContact: '+91 98123 45678', primaryEmail: 'hello@studioacoustics.in',
      gstin: '', tradesProvided: ['Acoustic Design', 'Acoustic Spec'],
      notes: 'Acoustic consultancy — typically engaged for cafés, offices, music rooms.', createdOn: '2025-02-14' },
  ],

  MasterVendorCatalogueColumns: [
    { id: 1, tab: 'labour', key: 'crewSize', label: 'Crew Size' },
    { id: 2, tab: 'labour', key: 'rateBasis', label: 'Rate Basis' },
    { id: 3, tab: 'material', key: 'leadTime', label: 'Lead Time' },
    { id: 4, tab: 'equipment', key: 'powerLoad', label: 'Power Load' },
  ],

  MasterVendorCatalogueItems: [
    { id: 1, tab: 'labour', category: 'Civil', productName: 'Masonry team', brand: 'Atlas Build Co.', pictureUrl: '', feature: 'Blockwork, plaster, minor concrete repairs', colour: '-', sku: 'LAB-CIV-001', applicationAreas: 'Site execution', usage: 'Residential & commercial', safety: 'PPE mandatory', sustainability: '-', materialContents: '-', notes: 'Preferred for compact residential sites.', details: { crewSize: '6-8', rateBasis: 'per day' } },
    { id: 2, tab: 'labour', category: 'Joinery', productName: 'Modular carpentry crew', brand: 'Atlas Build Co.', pictureUrl: '', feature: 'Wardrobes, kitchens, loose furniture fitting', colour: '-', sku: 'LAB-JOIN-002', applicationAreas: 'Interiors', usage: 'Residential', safety: 'Toolbox talk before cutting', sustainability: '-', materialContents: '-', notes: 'Good finishing discipline.', details: { crewSize: '4', rateBasis: 'per scope' } },
    { id: 3, tab: 'material', category: 'Engineered Surface', productName: 'Pietra Sicilia', brand: 'Porcelanosa', pictureUrl: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=240&q=80&auto=format&fit=crop', feature: 'Slip-resistant large format surface', colour: 'Gray, Beige', sku: '-', applicationAreas: 'Walls, Floors, Cladding', usage: 'Commercial & Residential', safety: 'Slip-Resistant', sustainability: '-', materialContents: '-', notes: '', details: { leadTime: '3-4 weeks' } },
    { id: 4, tab: 'material', category: 'Wood', productName: 'Heritage Oak - Oil Finish', brand: 'Anthology Woods', pictureUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=240&q=80&auto=format&fit=crop', feature: 'Natural veneer finish', colour: 'Brown', sku: '-', applicationAreas: 'Walls, Cladding, Floors, Decor', usage: 'Commercial & Residential', safety: 'High durability', sustainability: 'Reclaimed Oak', materialContents: 'Oak veneer', notes: '', details: { leadTime: '2-3 weeks' } },
    { id: 5, tab: 'equipment', category: 'Coffee Equipment', productName: 'Espresso machine 2-group', brand: 'Espresso Italia', pictureUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=240&q=80&auto=format&fit=crop', feature: 'Commercial espresso service', colour: 'Steel / Black', sku: 'EQ-COF-001', applicationAreas: 'Cafe counter', usage: 'Commercial', safety: 'Dedicated electrical line', sustainability: '-', materialContents: 'Stainless steel', notes: 'Coordinate counter cut-outs before order.', details: { powerLoad: '4.5 kW' } },
  ],

  /* ---- Phase 5.7 Feature 3 — Studio-wide settings (single-row "table") ----
     One record. Holds branding, tax/legal, defaults for new projects, notification prefs.
     Future features (invoicing, exports, automated reminders) read from here. */
  MasterStudioSettings: [
    {
      id: 1,
      // ===== Studio identity =====
      studioName: 'Studio/OS Demo',
      tagline: 'Architecture & Interior Design',
      logoUrl: '',
      logoInitials: 'SO',
      logoAccent: '#B4593C',
      defaultCity: 'Mumbai',
      defaultState: 'MH',
      websiteUrl: 'https://studioos.example.in',
      foundedYear: '2018',
      // ===== Tax & legal =====
      gstin: '27AAACS1234R1Z1',
      pan: 'AAACS1234R',
      registeredAddress: '301, Heera Panna Mall, Powai, Mumbai 400076, Maharashtra, India',
      billingEmail: 'billing@studioos.example.in',
      cinNumber: '',
      // ===== Defaults for new projects =====
      defaultServiceType: 'Design + Technical Drawing + Consultation',
      defaultWorkflowTemplate: '', // resolved against MasterWorkflowTemplates by name
      defaultPaymentTemplate: '',
      defaultProjectIdPrefix: 'STD',
      // ===== Notification preferences =====
      defaultReminderChannel: 'WhatsApp', // WhatsApp | Email | SMS
      businessHoursStart: '10:00',
      businessHoursEnd: '19:00',
      workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      // ===== Meta =====
      lastUpdatedOn: '2026-05-05',
      lastUpdatedBy: 'Aanya Sharma',
    },
  ],


  /* ---- Move 3: Approval categories (drives Approvals tab type dropdown) ---- */
  MasterApprovalTypes: [
    { id: 1, value: 'Concept Sign-off',       linkedStage: 'Concept',             clientFacing: 'yes', slaDays: '5',  description: 'Major concept direction approval before DD begins.' },
    { id: 2, value: 'Layout Approval',        linkedStage: 'Concept',             clientFacing: 'yes', slaDays: '4',  description: 'Floor plan layout sign-off from client.' },
    { id: 3, value: 'Mood Board / Material',  linkedStage: 'Design Development', clientFacing: 'yes', slaDays: '3',  description: 'Material direction, finishes, palette approval.' },
    { id: 4, value: 'BOQ Approval',           linkedStage: 'BOQ',                clientFacing: 'yes', slaDays: '7',  description: 'Bill of quantities and pricing sign-off.' },
    { id: 5, value: 'Drawing Set Release',    linkedStage: 'Working Drawings',   clientFacing: 'no',  slaDays: '2',  description: 'Internal QA before releasing working drawings to site.' },
    { id: 6, value: 'Vendor PO',              linkedStage: 'Procurement',        clientFacing: 'no',  slaDays: '2',  description: 'Internal approval for purchase orders above threshold.' },
    { id: 7, value: 'Material Sample',        linkedStage: 'Procurement',        clientFacing: 'yes', slaDays: '3',  description: 'Physical sample sign-off before bulk order.' },
    { id: 8, value: 'Variation Order',        linkedStage: 'Site Execution',     clientFacing: 'yes', slaDays: '4',  description: 'Scope/cost change request during execution.' },
    { id: 9, value: 'Snag List Closure',      linkedStage: 'Snag List',          clientFacing: 'yes', slaDays: '5',  description: 'Final defect-list closure before handover.' },
    { id: 10, value: 'Stage Payment Release', linkedStage: 'Handover',           clientFacing: 'yes', slaDays: '3',  description: 'Trigger client payment release per milestone.' },
  ],
};
