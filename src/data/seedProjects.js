export const seedProjects = [
  /* =====================================================================
     KHANNA PENTHOUSE — PALI HILL (Phase 9.0.22 — Demo showpiece)
     A fully-loaded showcase project for client demos. Rich data across
     payments, levels/zones/spaces, MOMs, files, tasks, approvals.
     ID kept stable for the Reset Demo Data feature.
  ===================================================================== */
  {
    id: 'STD-2026-100', name: 'Khanna Penthouse — Pali Hill', category: 'Home Owner', propertyType: 'Penthouse',
    siteCondition: 'Greenfield – Bare Shell',
    serviceType: 'Design + Build (Turnkey)', city: 'Mumbai', state: 'MH',
    startDate: '08 Dec 2025', expCompletion: '15 Nov 2026',
    currentStage: 'Site Supervision - Cilvil, Structure & MEP', status: 'on-track', progress: 62,
    pendingApprovals: 1, overdueTasks: 0, paymentDue: true,
    pm: 'Riya Sharma', pmInitials: 'RS', client: 'Arjun & Sara Khanna', accent: '#8B6F47',
    _wizard: {
      primaryClientId: 7, /* Arjun & Sara Khanna */
      onboardingAttentionTags: ['Repeat client', 'High-end finishes'],
      clientFlags: ['VIP', 'Has art collection — display considerations'],
      builtUpArea: '7800', numberOfLevels: '3',
      includedScope: 'Full interior design, custom joinery, lighting design, art display lighting, soft furnishings, terrace landscape design, smart home integration.',
      excludedScope: 'Building structural changes, exterior facade, common area work.',
      designStyle: 'Quiet Luxury with Indian Modern accents',
      keyAspirations: 'A penthouse that frames Sara\'s contemporary Indian art collection while feeling warm and lived-in. Indoor-outdoor flow. No marble overload — focus on warm woods, fabric walls, and subtle metalwork.',
      totalProjectValue: '6800000',
      decisionMakers: [
        { name: 'Arjun Khanna', role: 'Owner', contact: '+91 98201 99887', email: 'arjun@khannafamily.in', commPref: ['WhatsApp', 'Email'] },
        { name: 'Sara Khanna', role: 'Spouse / Final aesthetic call', contact: '+91 98201 99888', email: 'sara@khannafamily.in', commPref: ['WhatsApp'] },
      ],
      finalApprovalAuthority: 'Sara Khanna',
      billingContact: { name: 'Arjun Khanna', role: 'Owner', mobile: '+91 98201 99887' },
      siteContact: { name: 'Devansh Iyer', role: 'Site Manager', mobile: '+91 98919 22334' },
      externalStakeholders: [
        { vendorId: 1, projectRole: 'Civil + finishing — primary contractor', projectNotes: 'Atlas team led by Mahesh Krishnan. On site since Mar 2026.' },
        { vendorId: 2, projectRole: 'Lighting design + selection', projectNotes: 'Klove + Magari curated. Living room chandelier on 14-week lead.' },
        { vendorId: 4, projectRole: 'Custom joinery — wardrobes + library', projectNotes: 'Sahil Bharti workshop in Khar. Walnut + brushed brass theme.' },
      ],
      paymentTerms: [
        { id: 'pmt-kh-1', name: 'Signing advance',         linkedStage: 'Onboarding Stage',                                  percentage: '15', amount: '1020000', amountManualOverride: false, targetDate: '2025-12-08', amountReceived: 1020000, receiptDate: '2025-12-05', triggerCondition: 'On signed contract',  reminderEnabled: false, reminderType: 'WhatsApp' },
        { id: 'pmt-kh-2', name: 'Concept signoff',         linkedStage: 'Concept Development Stage',                         percentage: '15', amount: '1020000', amountManualOverride: false, targetDate: '2026-01-25', amountReceived: 1020000, receiptDate: '2026-01-22', triggerCondition: 'On client approval',  reminderEnabled: true,  reminderType: 'Email' },
        { id: 'pmt-kh-3', name: 'DD signoff',              linkedStage: 'Design Development Stage',                          percentage: '20', amount: '1360000', amountManualOverride: false, targetDate: '2026-03-15', amountReceived: 1360000, receiptDate: '2026-03-13', triggerCondition: 'On client approval',  reminderEnabled: true,  reminderType: 'Email' },
        { id: 'pmt-kh-4', name: 'GFC + tender release',    linkedStage: 'GFC Drawings',                                      percentage: '15', amount: '1020000', amountManualOverride: false, targetDate: '2026-04-20', amountReceived: 1020000, receiptDate: '2026-04-25', triggerCondition: 'On stage completion', reminderEnabled: true,  reminderType: 'Email' },
        { id: 'pmt-kh-5', name: 'Site execution 50%',      linkedStage: 'Site Supervision - Cilvil, Structure & MEP',        percentage: '20', amount: '1360000', amountManualOverride: false, targetDate: '2026-05-15', amountReceived: 680000,  receiptDate: '2026-05-08', triggerCondition: 'On stage 50% milestone', reminderEnabled: true, reminderType: 'WhatsApp' },
        { id: 'pmt-kh-6', name: 'Snag closure',            linkedStage: 'Site Review & DeSnag List',                         percentage: '10', amount: '680000',  amountManualOverride: false, targetDate: '2026-10-15', amountReceived: 0,       receiptDate: '',           triggerCondition: 'On stage completion', reminderEnabled: true,  reminderType: 'Email' },
        { id: 'pmt-kh-7', name: 'Final balance + handover', linkedStage: 'Hand Over',                                        percentage: '5',  amount: '340000',  amountManualOverride: false, targetDate: '2026-11-15', amountReceived: 0,       receiptDate: '',           triggerCondition: 'On client approval',  reminderEnabled: true,  reminderType: 'Email' },
      ],
      projectLevels: [
        /* Level 1 — Lower (entry, public, formal living) */
        { id: 'kh-lv-1', name: 'Lower Level — Public Floor', masterRef: null, levelType: 'Ground', levelOrder: 0, expanded: true, zones: [
          { id: 'kh-zn-1', name: 'Arrival & Entry Foyer', masterRef: null, expanded: true, spaces: [
            { id: 'kh-sp-1', name: 'Private Lift Lobby', masterRef: null, expanded: false, features: [
              { id: 'kh-ft-1', name: 'Wall Treatment', masterRef: null, expanded: false, elements: [
                { id: 'kh-el-1', name: 'Italian Travertine Cladding (Silver Beige)', masterRef: null, specs: [
                  { id: 'sp-1', label: 'Material', value: 'Silver Beige Travertine, honed finish' },
                  { id: 'sp-2', label: 'Thickness', value: '20mm' },
                  { id: 'sp-3', label: 'Pattern', value: 'Vein-cut, bookmatched' },
                  { id: 'sp-4', label: 'Vendor', value: 'Stonex — Andheri E' },
                  { id: 'sp-5', label: 'Rate', value: '₹485 / sqft' },
                ], checklists: [], drawings: [] },
                { id: 'kh-el-2', name: 'Brushed Brass Inlay Strip', masterRef: null, specs: [
                  { id: 'sp-6', label: 'Material', value: 'Brushed brass extrusion 12mm' },
                  { id: 'sp-7', label: 'Length', value: '7.5m running' },
                  { id: 'sp-8', label: 'Vendor', value: 'Sahil Bharti Joinery' },
                ], checklists: [], drawings: [] },
              ]},
              { id: 'kh-ft-2', name: 'Flooring', masterRef: null, expanded: false, elements: [
                { id: 'kh-el-3', name: 'Statuario Marble Slab', masterRef: null, specs: [
                  { id: 'sp-9', label: 'Material', value: 'Statuario Venato, polished' },
                  { id: 'sp-10', label: 'Thickness', value: '18mm' },
                  { id: 'sp-11', label: 'Slab size', value: '2400 × 1200mm' },
                  { id: 'sp-12', label: 'Edge profile', value: 'Mitred 45°' },
                  { id: 'sp-13', label: 'Vendor', value: 'Classic Marble — Vasai' },
                  { id: 'sp-14', label: 'Rate', value: '₹780 / sqft' },
                ], checklists: [], drawings: [] },
              ]},
              { id: 'kh-ft-3', name: 'Lighting', masterRef: null, expanded: false, elements: [
                { id: 'kh-el-4', name: 'Custom Brass Pendant Cluster', masterRef: null, specs: [
                  { id: 'sp-15', label: 'Designer', value: 'Klove Studio — bespoke commission' },
                  { id: 'sp-16', label: 'Cluster of', value: '7 hand-blown smoke glass globes' },
                  { id: 'sp-17', label: 'Lead time', value: '14 weeks' },
                  { id: 'sp-18', label: 'Cost', value: '₹3,85,000' },
                ], checklists: [], drawings: [] },
              ]},
            ]},
            { id: 'kh-sp-2', name: 'Entry Foyer', masterRef: null, expanded: false, features: [
              { id: 'kh-ft-4', name: 'Wall Treatment', masterRef: null, expanded: false, elements: [
                { id: 'kh-el-5', name: 'Walnut Veneer Panelling', masterRef: null, specs: [
                  { id: 'sp-19', label: 'Veneer', value: 'American Black Walnut, book-matched' },
                  { id: 'sp-20', label: 'Sub-frame', value: '18mm BWP ply with PU finish' },
                  { id: 'sp-21', label: 'Rate', value: '₹520 / sqft' },
                  { id: 'sp-22', label: 'Vendor', value: 'Sahil Bharti Joinery' },
                ], checklists: [], drawings: [] },
              ]},
              { id: 'kh-ft-5', name: 'Joinery', masterRef: null, expanded: false, elements: [
                { id: 'kh-el-6', name: 'Console with Concealed Storage', masterRef: null, specs: [
                  { id: 'sp-23', label: 'Top', value: 'Statuario marble 30mm' },
                  { id: 'sp-24', label: 'Body', value: 'Walnut + brass legs' },
                  { id: 'sp-25', label: 'Length', value: '1800mm' },
                ], checklists: [], drawings: [] },
              ]},
            ]},
          ]},
          { id: 'kh-zn-2', name: 'Formal Living', masterRef: null, expanded: true, spaces: [
            { id: 'kh-sp-3', name: 'Living Room', masterRef: null, expanded: false, features: [
              { id: 'kh-ft-6', name: 'Wall Treatment', masterRef: null, expanded: false, elements: [
                { id: 'kh-el-7', name: 'Fabric-wrapped Wall Panels', masterRef: null, specs: [
                  { id: 'sp-26', label: 'Fabric', value: 'Romo Linara — Stone' },
                  { id: 'sp-27', label: 'Pattern', value: 'Vertical channel quilting, 200mm spacing' },
                  { id: 'sp-28', label: 'Backing', value: 'Acoustic foam 12mm' },
                  { id: 'sp-29', label: 'Rate', value: '₹680 / sqft' },
                ], checklists: [], drawings: [] },
                { id: 'kh-el-8', name: 'Art Display Wall', masterRef: null, specs: [
                  { id: 'sp-30', label: 'Finish', value: 'Tadelakt limewash — bone white' },
                  { id: 'sp-31', label: 'Lighting', value: 'Track-mounted gallery spots, 3000K' },
                  { id: 'sp-32', label: 'Brackets', value: 'Concealed gallery rail, 50kg load' },
                ], checklists: [], drawings: [] },
              ]},
              { id: 'kh-ft-7', name: 'Flooring', masterRef: null, expanded: false, elements: [
                { id: 'kh-el-9', name: 'European Oak Engineered Wood', masterRef: null, specs: [
                  { id: 'sp-33', label: 'Material', value: 'Listone Giordano Heritage — Oak Naturale' },
                  { id: 'sp-34', label: 'Plank size', value: '2200 × 220 × 14mm' },
                  { id: 'sp-35', label: 'Finish', value: 'Brushed + UV oiled' },
                  { id: 'sp-36', label: 'Rate', value: '₹1,250 / sqft' },
                  { id: 'sp-37', label: 'Vendor', value: 'Pergo India — Powai' },
                ], checklists: [], drawings: [] },
              ]},
              { id: 'kh-ft-8', name: 'Lighting', masterRef: null, expanded: false, elements: [
                { id: 'kh-el-10', name: 'Statement Chandelier — Magari Iris', masterRef: null, specs: [
                  { id: 'sp-38', label: 'Brand', value: 'Magari (Italy)' },
                  { id: 'sp-39', label: 'Diameter', value: '1400mm' },
                  { id: 'sp-40', label: 'Bulbs', value: '12× G9 LED, dimmable' },
                  { id: 'sp-41', label: 'Lead time', value: '16 weeks ex-factory' },
                  { id: 'sp-42', label: 'Cost', value: '₹6,80,000' },
                ], checklists: [], drawings: [] },
                { id: 'kh-el-11', name: 'Recessed Cove Lighting', masterRef: null, specs: [
                  { id: 'sp-43', label: 'Type', value: 'Linear LED strip 3000K, 24V' },
                  { id: 'sp-44', label: 'Length', value: '24m perimeter' },
                  { id: 'sp-45', label: 'Driver', value: 'Mean Well dimmable, DALI' },
                ], checklists: [], drawings: [] },
              ]},
            ]},
            { id: 'kh-sp-4', name: 'Bar Nook', masterRef: null, expanded: false, features: [
              { id: 'kh-ft-9', name: 'Joinery', masterRef: null, expanded: false, elements: [
                { id: 'kh-el-12', name: 'Custom Bar Cabinet', masterRef: null, specs: [
                  { id: 'sp-46', label: 'Body', value: 'Smoked oak veneer + antique brass mesh' },
                  { id: 'sp-47', label: 'Counter top', value: 'Calacatta Viola marble 30mm' },
                  { id: 'sp-48', label: 'Internal lighting', value: 'LED strips with motion sensor' },
                ], checklists: [], drawings: [] },
              ]},
            ]},
          ]},
          { id: 'kh-zn-3', name: 'Dining', masterRef: null, expanded: false, spaces: [
            { id: 'kh-sp-5', name: 'Dining Room', masterRef: null, expanded: false, features: [
              { id: 'kh-ft-10', name: 'Lighting', masterRef: null, expanded: false, elements: [
                { id: 'kh-el-13', name: 'Linear Pendant Over Table', masterRef: null, specs: [
                  { id: 'sp-49', label: 'Brand', value: 'Vibia Wireflow — custom 2400mm' },
                  { id: 'sp-50', label: 'Cost', value: '₹4,20,000' },
                ], checklists: [], drawings: [] },
              ]},
            ]},
            { id: 'kh-sp-6', name: 'Powder Room', masterRef: null, expanded: false, features: [] },
          ]},
          { id: 'kh-zn-4', name: 'Service & Utility', masterRef: null, expanded: false, spaces: [
            { id: 'kh-sp-7', name: 'Kitchen', masterRef: null, expanded: false, features: [
              { id: 'kh-ft-11', name: 'Joinery', masterRef: null, expanded: false, elements: [
                { id: 'kh-el-14', name: 'Modular Kitchen — Poliform', masterRef: null, specs: [
                  { id: 'sp-51', label: 'Brand', value: 'Poliform Varenna — Phoenix line' },
                  { id: 'sp-52', label: 'Finish', value: 'Smoked oak + matte lacquer' },
                  { id: 'sp-53', label: 'Counter', value: 'Dekton Aura 20mm' },
                  { id: 'sp-54', label: 'Cost (turnkey)', value: '₹28,50,000' },
                ], checklists: [], drawings: [] },
              ]},
              { id: 'kh-ft-12', name: 'Appliances', masterRef: null, expanded: false, elements: [
                { id: 'kh-el-15', name: 'Built-in Appliance Suite', masterRef: null, specs: [
                  { id: 'sp-55', label: 'Hob', value: 'Gaggenau Vario 200 — 2 modules' },
                  { id: 'sp-56', label: 'Oven', value: 'Gaggenau combi-steam BS474' },
                  { id: 'sp-57', label: 'Refrigeration', value: 'Sub-Zero ICBBI-36U' },
                ], checklists: [], drawings: [] },
              ]},
            ]},
            { id: 'kh-sp-8', name: 'Pantry', masterRef: null, expanded: false, features: [] },
            { id: 'kh-sp-9', name: 'Staff Quarters', masterRef: null, expanded: false, features: [] },
          ]},
        ]},
        /* Level 2 — Upper (private, bedrooms) */
        { id: 'kh-lv-2', name: 'Upper Level — Private Floor', masterRef: null, levelType: 'First', levelOrder: 1, expanded: true, zones: [
          { id: 'kh-zn-5', name: 'Master Suite', masterRef: null, expanded: true, spaces: [
            { id: 'kh-sp-10', name: 'Master Bedroom', masterRef: null, expanded: false, features: [
              { id: 'kh-ft-13', name: 'Wall Treatment', masterRef: null, expanded: false, elements: [
                { id: 'kh-el-16', name: 'Headboard Wall — Channel Tufted', masterRef: null, specs: [
                  { id: 'sp-58', label: 'Fabric', value: 'Pierre Frey velvet — Sienna' },
                  { id: 'sp-59', label: 'Channel width', value: '180mm vertical' },
                  { id: 'sp-60', label: 'Height', value: '2400mm wall-to-wall' },
                ], checklists: [], drawings: [] },
              ]},
              { id: 'kh-ft-14', name: 'Joinery', masterRef: null, expanded: false, elements: [
                { id: 'kh-el-17', name: 'Walk-in Wardrobe System', masterRef: null, specs: [
                  { id: 'sp-61', label: 'Brand', value: 'Lema Selecta' },
                  { id: 'sp-62', label: 'Length', value: '4800mm full wall' },
                  { id: 'sp-63', label: 'Finish', value: 'Smoked oak + brushed brass' },
                  { id: 'sp-64', label: 'Cost', value: '₹14,80,000' },
                ], checklists: [], drawings: [] },
                { id: 'kh-el-18', name: 'Bed — Custom King', masterRef: null, specs: [
                  { id: 'sp-65', label: 'Size', value: '2200 × 2000mm (Cal King)' },
                  { id: 'sp-66', label: 'Frame', value: 'Walnut + leather wrapping' },
                  { id: 'sp-67', label: 'Mattress', value: 'Hypnos Royal' },
                ], checklists: [], drawings: [] },
              ]},
            ]},
            { id: 'kh-sp-11', name: 'Master Bath', masterRef: null, expanded: false, features: [
              { id: 'kh-ft-15', name: 'Wall Treatment', masterRef: null, expanded: false, elements: [
                { id: 'kh-el-19', name: 'Calacatta Viola Cladding', masterRef: null, specs: [
                  { id: 'sp-68', label: 'Material', value: 'Calacatta Viola, polished' },
                  { id: 'sp-69', label: 'Pattern', value: 'Bookmatched, full-height' },
                  { id: 'sp-70', label: 'Rate', value: '₹1,400 / sqft' },
                ], checklists: [], drawings: [] },
              ]},
              { id: 'kh-ft-16', name: 'Sanitaryware', masterRef: null, expanded: false, elements: [
                { id: 'kh-el-20', name: 'Bath Suite — Antoniolupi', masterRef: null, specs: [
                  { id: 'sp-71', label: 'Vanity', value: 'Antoniolupi Strato — Travertine top' },
                  { id: 'sp-72', label: 'Mixers', value: 'Fantini Milano — brushed brass' },
                  { id: 'sp-73', label: 'WC', value: 'Toto Neorest NX2' },
                  { id: 'sp-74', label: 'Bath', value: 'Antoniolupi Reflexmood freestanding' },
                ], checklists: [], drawings: [] },
              ]},
            ]},
            { id: 'kh-sp-12', name: 'Master Walk-in Closet', masterRef: null, expanded: false, features: [] },
          ]},
          { id: 'kh-zn-6', name: 'Children\'s Suite', masterRef: null, expanded: false, spaces: [
            { id: 'kh-sp-13', name: 'Daughter\'s Bedroom', masterRef: null, expanded: false, features: [] },
            { id: 'kh-sp-14', name: 'Daughter\'s Bath', masterRef: null, expanded: false, features: [] },
            { id: 'kh-sp-15', name: 'Son\'s Bedroom', masterRef: null, expanded: false, features: [] },
            { id: 'kh-sp-16', name: 'Son\'s Bath', masterRef: null, expanded: false, features: [] },
          ]},
          { id: 'kh-zn-7', name: 'Family Quarter', masterRef: null, expanded: false, spaces: [
            { id: 'kh-sp-17', name: 'Family Lounge', masterRef: null, expanded: false, features: [] },
            { id: 'kh-sp-18', name: 'Library / Study', masterRef: null, expanded: false, features: [
              { id: 'kh-ft-17', name: 'Joinery', masterRef: null, expanded: false, elements: [
                { id: 'kh-el-21', name: 'Custom Library Wall', masterRef: null, specs: [
                  { id: 'sp-75', label: 'Material', value: 'Walnut veneer + antique brass mesh' },
                  { id: 'sp-76', label: 'Length', value: '6200mm full wall' },
                  { id: 'sp-77', label: 'Includes', value: 'Sliding ladder + integrated lighting' },
                  { id: 'sp-78', label: 'Cost', value: '₹9,40,000' },
                ], checklists: [], drawings: [] },
              ]},
            ]},
          ]},
        ]},
        /* Level 3 — Terrace */
        { id: 'kh-lv-3', name: 'Terrace Level', masterRef: null, levelType: 'Terrace', levelOrder: 2, expanded: true, zones: [
          { id: 'kh-zn-8', name: 'Outdoor Living', masterRef: null, expanded: true, spaces: [
            { id: 'kh-sp-19', name: 'Outdoor Lounge', masterRef: null, expanded: false, features: [
              { id: 'kh-ft-18', name: 'Flooring', masterRef: null, expanded: false, elements: [
                { id: 'kh-el-22', name: 'IPE Wood Decking', masterRef: null, specs: [
                  { id: 'sp-79', label: 'Material', value: 'Brazilian IPE hardwood' },
                  { id: 'sp-80', label: 'Plank size', value: '21 × 145mm' },
                  { id: 'sp-81', label: 'Sub-frame', value: 'Marine-grade aluminium joists' },
                  { id: 'sp-82', label: 'Rate', value: '₹450 / sqft' },
                ], checklists: [], drawings: [] },
              ]},
            ]},
            { id: 'kh-sp-20', name: 'Plunge Pool & Sun Deck', masterRef: null, expanded: false, features: [] },
            { id: 'kh-sp-21', name: 'Outdoor Dining', masterRef: null, expanded: false, features: [] },
            { id: 'kh-sp-22', name: 'Garden — Tropical Planting', masterRef: null, expanded: false, features: [] },
          ]},
          { id: 'kh-zn-9', name: 'Terrace Utility', masterRef: null, expanded: false, spaces: [
            { id: 'kh-sp-23', name: 'Outdoor Kitchen', masterRef: null, expanded: false, features: [] },
            { id: 'kh-sp-24', name: 'Equipment Room', masterRef: null, expanded: false, features: [] },
          ]},
        ]},
      ],
      projectTasks: [
        { id: 'kh-tk-1',  title: 'Confirm marble slab tagging — Master Bath',    description: 'Sara to visit Classic Marble Vasai to physically tag Calacatta Viola slabs for Master Bath. Pattern continuity is critical.', linkedStage: 'Site Supervision - Cilvil, Structure & MEP', linkedActivity: 'Material Selection',  assigneeId: 3, assigneeName: 'Meher Kapoor',  assignedById: 2, assignedAt: '2026-04-28', startDate: '2026-04-28', assignee: 'Meher Kapoor',  status: 'in_progress', dueDate: '2026-05-14', createdOn: '2026-04-28', completedOn: '',           masterRef: null, isClientVisible: true, isVendorVisible: true, isInternalOnly: false },
        { id: 'kh-tk-2',  title: 'Walnut veneer mock-up approval',                description: 'Send 3 walnut veneer samples for Sara\'s approval — book-matched, slip-matched, and figured. Master bedroom + library use same veneer.', linkedStage: 'Site Supervision - Cilvil, Structure & MEP', linkedActivity: 'Sample Approval', assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-05-01', startDate: '2026-05-01', assignee: 'Meher Kapoor', status: 'in_progress', dueDate: '2026-05-12', createdOn: '2026-05-01', completedOn: '', masterRef: null, isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
        { id: 'kh-tk-3',  title: 'Lighting fixture FAT — Living Room chandelier', description: 'Coordinate factory acceptance test with Magari (Italy) for the 1400mm Iris chandelier. Sara wants to see test photos before shipping.', linkedStage: 'Site Supervision - Cilvil, Structure & MEP', linkedActivity: 'Vendor Coordination', assigneeId: 2, assigneeName: 'Riya Sharma', assignedById: 2, assignedAt: '2026-05-02', startDate: '2026-05-15', assignee: 'Riya Sharma', status: 'todo', dueDate: '2026-05-22', createdOn: '2026-05-02', completedOn: '', masterRef: null, isClientVisible: true, isVendorVisible: true, isInternalOnly: false },
        { id: 'kh-tk-4',  title: 'Site visit — MEP first-fix sign-off',           description: 'Devansh + electrical consultant + Riya walkthrough for first-fix MEP sign-off across Lower + Upper levels.', linkedStage: 'Site Supervision - Cilvil, Structure & MEP', linkedActivity: 'Site Inspection', assigneeId: 4, assigneeName: 'Devansh Iyer', assignedById: 2, assignedAt: '2026-05-04', startDate: '2026-05-04', assignee: 'Devansh Iyer', status: 'done', dueDate: '2026-05-06', createdOn: '2026-05-04', completedOn: '2026-05-06', masterRef: null, isClientVisible: false, isVendorVisible: true, isInternalOnly: false },
        { id: 'kh-tk-5',  title: 'Art display lighting — track placement final',  description: 'Sara to share final list of artworks and dimensions so we can finalise track placement. Living + library + master bedroom impact.', linkedStage: 'Site Supervision - Cilvil, Structure & MEP', linkedActivity: 'Site Inspection', assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-04-25', startDate: '2026-05-12', assignee: 'Meher Kapoor', status: 'in_progress', dueDate: '2026-05-18', createdOn: '2026-04-25', completedOn: '', masterRef: null, isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
        { id: 'kh-tk-6',  title: 'Terrace deck waterproofing — pre-IPE check',   description: 'Atlas to confirm waterproofing membrane integrity tests passed before IPE installation begins.', linkedStage: 'Site Supervision - Cilvil, Structure & MEP', linkedActivity: 'Vendor Coordination', assigneeId: 4, assigneeName: 'Devansh Iyer', assignedById: 2, assignedAt: '2026-05-07', startDate: '2026-05-22', assignee: 'Devansh Iyer', status: 'todo', dueDate: '2026-05-25', createdOn: '2026-05-07', completedOn: '', masterRef: null, isClientVisible: false, isVendorVisible: true, isInternalOnly: false },
        { id: 'kh-tk-7',  title: 'Library wall — workshop visit',                 description: 'Riya + Sara to visit Sahil Bharti workshop in Khar to inspect library wall in production. Brass mesh weave needs Sara approval.', linkedStage: 'Site Supervision - Cilvil, Structure & MEP', linkedActivity: 'Vendor Coordination', assigneeId: 2, assigneeName: 'Riya Sharma', assignedById: 2, assignedAt: '2026-05-05', startDate: '2026-05-15', assignee: 'Riya Sharma', status: 'todo', dueDate: '2026-05-20', createdOn: '2026-05-05', completedOn: '', masterRef: null, isClientVisible: true, isVendorVisible: true, isInternalOnly: false },
        { id: 'kh-tk-8',  title: 'Furniture procurement — review schedule',      description: 'Final furniture list needs sign-off so procurement timelines don\'t clash with site finishing. 18-week lead items at risk.', linkedStage: 'Site Supervision - Cilvil, Structure & MEP', linkedActivity: 'Procurement Planning', assigneeId: 2, assigneeName: 'Riya Sharma', assignedById: 2, assignedAt: '2026-05-06', startDate: '2026-05-10', assignee: 'Riya Sharma', status: 'todo', dueDate: '2026-05-15', createdOn: '2026-05-06', completedOn: '', masterRef: null, isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
        /* === Phase 9.1.14 — Onboarding stage tasks (5 deliverables) === */
        /* Deliverable: Signed Engagement → Activity: Scope & Commercial Alignment */
        { id: 'kh-ob-1',  title: 'Define scope of work in writing',                description: 'Document everything in/out of scope. Sara wants no ambiguity.',                                          linkedStage: 'Onboarding Stage', linkedActivity: 'Scope & Commercial Alignment', assigneeId: 2, assigneeName: 'Riya Sharma', assignedById: 2, assignedAt: '2025-12-01', startDate: '2025-12-01', assignee: 'Riya Sharma', status: 'done',        dueDate: '2025-12-05', createdOn: '2025-12-01', completedOn: '2025-12-04', masterRef: null, isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
        { id: 'kh-ob-2',  title: 'Confirm commercial terms with client',           description: 'Total fee ₹68L · payment milestones agreed.',                                                          linkedStage: 'Onboarding Stage', linkedActivity: 'Scope & Commercial Alignment', assigneeId: 2, assigneeName: 'Riya Sharma', assignedById: 2, assignedAt: '2025-12-01', startDate: '2025-12-02', assignee: 'Riya Sharma', status: 'done',        dueDate: '2025-12-05', createdOn: '2025-12-01', completedOn: '2025-12-05', masterRef: null, isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
        { id: 'kh-ob-3',  title: 'Get contract signed by both parties',            description: 'Both Arjun and Sara are signatories. Notarized.',                                                       linkedStage: 'Onboarding Stage', linkedActivity: 'Contract Signing',             assigneeId: 2, assigneeName: 'Riya Sharma', assignedById: 2, assignedAt: '2025-12-05', startDate: '2025-12-05', assignee: 'Riya Sharma', status: 'done',        dueDate: '2025-12-08', createdOn: '2025-12-05', completedOn: '2025-12-07', masterRef: null, isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
        { id: 'kh-ob-4',  title: 'File copy in shared drive',                      description: '',                                                                                                       linkedStage: 'Onboarding Stage', linkedActivity: 'Contract Signing',             assigneeId: 2, assigneeName: 'Riya Sharma', assignedById: 2, assignedAt: '2025-12-08', startDate: '2025-12-08', assignee: 'Riya Sharma', status: 'done',        dueDate: '2025-12-08', createdOn: '2025-12-08', completedOn: '2025-12-08', masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
        /* Deliverable: Client Brief Captured → Activity: Initial Client Brief Meeting */
        { id: 'kh-ob-5',  title: 'Schedule kick-off briefing with both clients',   description: 'Sara availability is the constraint.',                                                                  linkedStage: 'Onboarding Stage', linkedActivity: 'Initial Client Brief Meeting', assigneeId: 2, assigneeName: 'Riya Sharma', assignedById: 2, assignedAt: '2025-12-08', startDate: '2025-12-08', assignee: 'Riya Sharma', status: 'done',        dueDate: '2025-12-10', createdOn: '2025-12-08', completedOn: '2025-12-10', masterRef: null, isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
        { id: 'kh-ob-6',  title: 'Capture lifestyle, preferences, hard nos',       description: 'No mass-market brands · luxury aesthetic · Indian Modern accents.',                                    linkedStage: 'Onboarding Stage', linkedActivity: 'Initial Client Brief Meeting', assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2025-12-12', startDate: '2025-12-12', assignee: 'Meher Kapoor', status: 'done',        dueDate: '2025-12-15', createdOn: '2025-12-12', completedOn: '2025-12-14', masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
        { id: 'kh-ob-7',  title: 'Document attention tags + must-haves',           description: 'Brass · walnut veneer · Italian marble · custom Indian art.',                                          linkedStage: 'Onboarding Stage', linkedActivity: 'Initial Client Brief Meeting', assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2025-12-14', startDate: '2025-12-14', assignee: 'Meher Kapoor', status: 'done',        dueDate: '2025-12-15', createdOn: '2025-12-14', completedOn: '2025-12-14', masterRef: null, isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
        /* Deliverable: Internal Setup Done → Activity: Team & Workflow Setup */
        { id: 'kh-ob-8',  title: 'Assign PM, lead designer, site team',            description: 'Riya · Meher · Devansh',                                                                                linkedStage: 'Onboarding Stage', linkedActivity: 'Team & Workflow Setup',        assigneeId: 1, assigneeName: 'Aanya Sharma', assignedById: 1, assignedAt: '2025-11-28', startDate: '2025-11-28', assignee: 'Aanya Sharma', status: 'done',       dueDate: '2025-11-30', createdOn: '2025-11-28', completedOn: '2025-11-30', masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
        { id: 'kh-ob-9',  title: 'Clone workflow stages from master template',     description: 'Used "Penthouse Premium Design" template.',                                                              linkedStage: 'Onboarding Stage', linkedActivity: 'Team & Workflow Setup',        assigneeId: 2, assigneeName: 'Riya Sharma', assignedById: 1, assignedAt: '2025-11-30', startDate: '2025-11-30', assignee: 'Riya Sharma', status: 'done',        dueDate: '2025-12-01', createdOn: '2025-11-30', completedOn: '2025-12-01', masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
        { id: 'kh-ob-10', title: 'Set up shared project folder + access',          description: '',                                                                                                       linkedStage: 'Onboarding Stage', linkedActivity: 'Project Folder Setup',         assigneeId: 2, assigneeName: 'Riya Sharma', assignedById: 1, assignedAt: '2025-12-01', startDate: '2025-12-01', assignee: 'Riya Sharma', status: 'done',        dueDate: '2025-12-02', createdOn: '2025-12-01', completedOn: '2025-12-02', masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
        { id: 'kh-ob-11', title: 'Brief design team internally',                   description: 'Walk Meher + Devansh through brief, scope, timeline.',                                                  linkedStage: 'Onboarding Stage', linkedActivity: 'Team & Workflow Setup',        assigneeId: 2, assigneeName: 'Riya Sharma', assignedById: 1, assignedAt: '2025-12-02', startDate: '2025-12-03', assignee: 'Riya Sharma', status: 'done',        dueDate: '2025-12-04', createdOn: '2025-12-02', completedOn: '2025-12-03', masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
        /* Deliverable: Site Measurement & Photographs → Activity: Site Survey */
        { id: 'kh-ob-12', title: 'Schedule measurement window with client',        description: '4-hour window. Lights/services need to be on.',                                                          linkedStage: 'Onboarding Stage', linkedActivity: 'Site Survey',                  assigneeId: 4, assigneeName: 'Devansh Iyer', assignedById: 2, assignedAt: '2025-12-05', startDate: '2025-12-08', assignee: 'Devansh Iyer', status: 'done',        dueDate: '2025-12-10', createdOn: '2025-12-05', completedOn: '2025-12-09', checklistItems: [{ id: 'kh-ob-12-cl-1', text: "Confirm 4-hour window with society", done: true }, { id: 'kh-ob-12-cl-2', text: "Notify client 48 hrs ahead", done: true }, { id: 'kh-ob-12-cl-3', text: "Block Devansh + architect", done: true }, { id: 'kh-ob-12-cl-4', text: "Send calendar invite", done: true }], masterRef: null, isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
        { id: 'kh-ob-13', title: 'Coordinate with PM and architect',               description: 'Mukesh (architect) needs to be present for slab/column queries.',                                       linkedStage: 'Onboarding Stage', linkedActivity: 'Site Survey',                  assigneeId: 4, assigneeName: 'Devansh Iyer', assignedById: 2, assignedAt: '2025-12-08', startDate: '2025-12-09', assignee: 'Devansh Iyer', status: 'done',        dueDate: '2025-12-10', createdOn: '2025-12-08', completedOn: '2025-12-10', checklistItems: [{ id: 'kh-ob-13-cl-1', text: "Brief Mukesh on slab queries", done: true }, { id: 'kh-ob-13-cl-2', text: "Send pre-read of existing drawings", done: true }, { id: 'kh-ob-13-cl-3', text: "Confirm attendance", done: true }], masterRef: null, isClientVisible: false, isVendorVisible: true, isInternalOnly: false },
        { id: 'kh-ob-14', title: 'Record floor-plate dimensions',                  description: 'Lower + Upper + Penthouse-top. Triple-check critical dims.',                                            linkedStage: 'Onboarding Stage', linkedActivity: 'Site Survey',                  assigneeId: 4, assigneeName: 'Devansh Iyer', assignedById: 2, assignedAt: '2025-12-10', startDate: '2025-12-10', assignee: 'Devansh Iyer', status: 'done',        dueDate: '2025-12-12', createdOn: '2025-12-10', completedOn: '2025-12-12', checklistItems: [{ id: 'kh-ob-14-cl-1', text: "Lower Level — perimeter walls", done: true }, { id: 'kh-ob-14-cl-2', text: "Lower Level — internal walls", done: true }, { id: 'kh-ob-14-cl-3', text: "Upper Level — perimeter walls", done: true }, { id: 'kh-ob-14-cl-4', text: "Upper Level — internal walls", done: true }, { id: 'kh-ob-14-cl-5', text: "Penthouse Top — perimeter walls", done: false }, { id: 'kh-ob-14-cl-6', text: "Penthouse Top — internal walls", done: false }, { id: 'kh-ob-14-cl-7', text: "Cross-check critical dimensions", done: false }], masterRef: null, isClientVisible: false, isVendorVisible: true, isInternalOnly: false },
        { id: 'kh-ob-15', title: 'Photograph existing condition',                  description: 'Wide + detail shots of every room. ~200 photos.',                                                        linkedStage: 'Onboarding Stage', linkedActivity: 'Site Survey',                  assigneeId: 4, assigneeName: 'Devansh Iyer', assignedById: 2, assignedAt: '2025-12-10', startDate: '2025-12-10', assignee: 'Devansh Iyer', status: 'done',        dueDate: '2025-12-12', createdOn: '2025-12-10', completedOn: '2025-12-11', checklistItems: [{ id: 'kh-ob-15-cl-1', text: "Wide shots — every room", done: true }, { id: 'kh-ob-15-cl-2', text: "Detail shots — finishes", done: true }, { id: 'kh-ob-15-cl-3', text: "Service inlets/outlets", done: true }, { id: 'kh-ob-15-cl-4', text: "Ceiling condition", done: true }, { id: 'kh-ob-15-cl-5', text: "Upload to shared drive", done: true }], masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
        { id: 'kh-ob-16', title: 'Mark service entries and shafts',                description: 'AC plumbing + electrical risers + drainage shafts.',                                                     linkedStage: 'Onboarding Stage', linkedActivity: 'Site Survey',                  assigneeId: 4, assigneeName: 'Devansh Iyer', assignedById: 2, assignedAt: '2025-12-12', startDate: '2025-12-12', assignee: 'Devansh Iyer', status: 'in_progress', dueDate: '2025-12-15', createdOn: '2025-12-12', completedOn: '',           checklistItems: [{ id: 'kh-ob-16-cl-1', text: "AC plumbing routes", done: true }, { id: 'kh-ob-16-cl-2', text: "Electrical risers", done: true }, { id: 'kh-ob-16-cl-3', text: "Drainage shafts", done: false }, { id: 'kh-ob-16-cl-4', text: "Fresh-air shafts", done: false }], masterRef: null, isClientVisible: false, isVendorVisible: true, isInternalOnly: false },
        { id: 'kh-ob-17', title: 'Verify ceiling heights at multiple points',      description: 'Ceiling drops at corners — important for false ceiling design.',                                        linkedStage: 'Onboarding Stage', linkedActivity: 'Site Survey',                  assigneeId: 4, assigneeName: 'Devansh Iyer', assignedById: 2, assignedAt: '2025-12-12', startDate: '2025-12-12', assignee: 'Devansh Iyer', status: 'todo',        dueDate: '2025-12-15', createdOn: '2025-12-12', completedOn: '',           masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
        { id: 'kh-ob-18', title: 'Note structural columns and beams',              description: '',                                                                                                       linkedStage: 'Onboarding Stage', linkedActivity: 'Site Survey',                  assigneeId: 4, assigneeName: 'Devansh Iyer', assignedById: 2, assignedAt: '2025-12-12', startDate: '2025-12-12', assignee: 'Devansh Iyer', status: 'todo',        dueDate: '2025-12-15', createdOn: '2025-12-12', completedOn: '',           masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
        /* Deliverable: Site Analysis & Feasibility Study → Activity: Feasibility Study */
        { id: 'kh-ob-19', title: 'Analyse natural light + ventilation flows',      description: 'Map daylight at 9am / 1pm / 5pm.',                                                                       linkedStage: 'Onboarding Stage', linkedActivity: 'Feasibility Study',            assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2025-12-15', startDate: '2025-12-15', assignee: 'Meher Kapoor', status: 'in_progress', dueDate: '2025-12-20', createdOn: '2025-12-15', completedOn: '',           masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
        { id: 'kh-ob-20', title: 'Identify structural constraints + opportunities', description: 'Load-bearing walls flagged. Slab cut-outs possible at 2 locations.',                                    linkedStage: 'Onboarding Stage', linkedActivity: 'Feasibility Study',            assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2025-12-15', startDate: '2025-12-16', assignee: 'Meher Kapoor', status: 'todo',        dueDate: '2025-12-20', createdOn: '2025-12-15', completedOn: '',           masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
        { id: 'kh-ob-21', title: 'Document society / approval constraints',        description: 'Society NOC needed for slab cut-outs and AC outdoor units.',                                            linkedStage: 'Onboarding Stage', linkedActivity: 'Feasibility Study',            assigneeId: 2, assigneeName: 'Riya Sharma', assignedById: 2, assignedAt: '2025-12-16', startDate: '2025-12-18', assignee: 'Riya Sharma', status: 'todo',        dueDate: '2025-12-22', createdOn: '2025-12-16', completedOn: '',           masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },

        /* === Phase 9.1.14 — Concept stage tasks (6 deliverables) === */
        /* Deliverable: Idea-Concept Mood Board · CMF Palette → Activity: Mood Board Creation */
        { id: 'kh-cn-1',  title: 'Source 30+ reference images per direction',      description: 'Pinterest + ArchDaily + Yatzer + studio archive.',                                                       linkedStage: 'Concept Stage',    linkedActivity: 'Mood Board Creation',          assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-01-02', startDate: '2026-01-02', assignee: 'Meher Kapoor', status: 'done',        dueDate: '2026-01-05', createdOn: '2026-01-02', completedOn: '2026-01-04', checklistItems: [{ id: 'kh-cn-1-cl-1', text: "Pinterest — 30 saves per direction", done: true }, { id: 'kh-cn-1-cl-2', text: "ArchDaily references", done: true }, { id: 'kh-cn-1-cl-3', text: "Yatzer + studio archive", done: true }, { id: 'kh-cn-1-cl-4', text: "Categorise by space type", done: true }], masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
        { id: 'kh-cn-2',  title: 'Compose 3 boards in InDesign',                   description: 'Quiet Luxury · Indian Modern · Eclectic Maximal.',                                                       linkedStage: 'Concept Stage',    linkedActivity: 'Mood Board Creation',          assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-01-05', startDate: '2026-01-05', assignee: 'Meher Kapoor', status: 'done',        dueDate: '2026-01-08', createdOn: '2026-01-05', completedOn: '2026-01-08', checklistItems: [{ id: 'kh-cn-2-cl-1', text: "Board 1 — Quiet Luxury", done: true }, { id: 'kh-cn-2-cl-2', text: "Board 2 — Indian Modern", done: true }, { id: 'kh-cn-2-cl-3', text: "Board 3 — Eclectic Maximal", done: true }, { id: 'kh-cn-2-cl-4', text: "Caption + reference each image", done: true }], masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
        { id: 'kh-cn-3',  title: 'Print A3 quality',                               description: 'Studio printer · matte 200gsm.',                                                                          linkedStage: 'Concept Stage',    linkedActivity: 'Mood Board Creation',          assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-01-08', startDate: '2026-01-08', assignee: 'Meher Kapoor', status: 'done',        dueDate: '2026-01-09', createdOn: '2026-01-08', completedOn: '2026-01-09', masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
        { id: 'kh-cn-4',  title: 'Material samples physically attached',           description: 'Each board carries 5-7 swatches.',                                                                       linkedStage: 'Concept Stage',    linkedActivity: 'Mood Board Creation',          assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-01-09', startDate: '2026-01-09', assignee: 'Meher Kapoor', status: 'done',        dueDate: '2026-01-10', createdOn: '2026-01-09', completedOn: '2026-01-10', masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
        { id: 'kh-cn-5',  title: 'Walkthrough rehearsed with PM',                  description: 'Riya + Meher rehearse client pitch.',                                                                    linkedStage: 'Concept Stage',    linkedActivity: 'Mood Board Creation',          assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-01-10', startDate: '2026-01-10', assignee: 'Meher Kapoor', status: 'done',        dueDate: '2026-01-11', createdOn: '2026-01-10', completedOn: '2026-01-11', masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
        { id: 'kh-cn-6',  title: 'Client presentation + selection',                description: 'Sara picked Quiet Luxury — wanted 30% more brass.',                                                       linkedStage: 'Concept Stage',    linkedActivity: 'Mood Board Creation',          assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-01-12', startDate: '2026-01-12', assignee: 'Meher Kapoor', status: 'done',        dueDate: '2026-01-15', createdOn: '2026-01-12', completedOn: '2026-01-15', masterRef: null, isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
        /* Deliverable: Idea-Concept Mood Board · CMF Palette → Activity: CMF Palette Compilation */
        { id: 'kh-cn-7',  title: 'Compile colour palette from chosen direction',   description: '',                                                                                                       linkedStage: 'Concept Stage',    linkedActivity: 'CMF Palette Compilation',      assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-01-15', startDate: '2026-01-15', assignee: 'Meher Kapoor', status: 'done',        dueDate: '2026-01-17', createdOn: '2026-01-15', completedOn: '2026-01-17', checklistItems: [{ id: 'kh-cn-7-cl-1', text: "Primary 5 colours selected", done: true }, { id: 'kh-cn-7-cl-2', text: "Accent palette (3 colours)", done: true }, { id: 'kh-cn-7-cl-3', text: "Neutral base (3 tones)", done: true }, { id: 'kh-cn-7-cl-4', text: "Pantone references logged", done: true }], masterRef: null, isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
        { id: 'kh-cn-8',  title: 'Material library box — physical samples',        description: '~40 finishes/fabrics/stones.',                                                                            linkedStage: 'Concept Stage',    linkedActivity: 'CMF Palette Compilation',      assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-01-17', startDate: '2026-01-17', assignee: 'Meher Kapoor', status: 'done',        dueDate: '2026-01-19', createdOn: '2026-01-17', completedOn: '2026-01-19', masterRef: null, isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
        { id: 'kh-cn-9',  title: 'Document spec sheet for each finish',            description: '',                                                                                                       linkedStage: 'Concept Stage',    linkedActivity: 'CMF Palette Compilation',      assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-01-19', startDate: '2026-01-19', assignee: 'Meher Kapoor', status: 'in_progress', dueDate: '2026-01-22', createdOn: '2026-01-19', completedOn: '',           masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
        /* Deliverable: Design Style Proposed → Activity: Design Style Definition */
        { id: 'kh-cn-10', title: 'Define style direction in 1-pager',              description: 'Quiet Luxury with Indian Modern accents · brass + walnut + travertine.',                                linkedStage: 'Concept Stage',    linkedActivity: 'Design Style Definition',      assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-01-22', startDate: '2026-01-22', assignee: 'Meher Kapoor', status: 'in_progress', dueDate: '2026-01-25', createdOn: '2026-01-22', completedOn: '',           checklistItems: [{ id: 'kh-cn-10-cl-1', text: "Write 1-page summary", done: true }, { id: 'kh-cn-10-cl-2', text: "Reference 5-7 design precedents", done: false }, { id: 'kh-cn-10-cl-3', text: "Material vocabulary defined", done: false }], masterRef: null, isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
        { id: 'kh-cn-11', title: 'Reference architects + design language',         description: '',                                                                                                       linkedStage: 'Concept Stage',    linkedActivity: 'Design Style Definition',      assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-01-22', startDate: '2026-01-23', assignee: 'Meher Kapoor', status: 'todo',        dueDate: '2026-01-25', createdOn: '2026-01-22', completedOn: '',           masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
        { id: 'kh-cn-12', title: 'Present direction to client for sign-off',       description: '',                                                                                                       linkedStage: 'Concept Stage',    linkedActivity: 'Design Style Definition',      assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-01-25', startDate: '2026-01-25', assignee: 'Meher Kapoor', status: 'todo',        dueDate: '2026-01-27', createdOn: '2026-01-25', completedOn: '',           masterRef: null, isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
        /* Deliverable: Story Line → Activity: Narrative Development */
        { id: 'kh-cn-13', title: 'Draft narrative arc — the home\'s story',         description: 'Legacy + future. Family ritual + modern Indian aesthetic.',                                              linkedStage: 'Concept Stage',    linkedActivity: 'Narrative Development',        assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-01-27', startDate: '2026-01-27', assignee: 'Meher Kapoor', status: 'todo',        dueDate: '2026-01-30', createdOn: '2026-01-27', completedOn: '',           checklistItems: [{ id: 'kh-cn-13-cl-1', text: "Family heritage angle drafted", done: false }, { id: 'kh-cn-13-cl-2', text: "Modernity angle drafted", done: false }, { id: 'kh-cn-13-cl-3', text: "Synthesis paragraph", done: false }], masterRef: null, isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
        { id: 'kh-cn-14', title: 'Map narrative across each space',                description: 'Each room carries one chapter of the story.',                                                            linkedStage: 'Concept Stage',    linkedActivity: 'Narrative Development',        assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-01-30', startDate: '2026-01-30', assignee: 'Meher Kapoor', status: 'todo',        dueDate: '2026-02-02', createdOn: '2026-01-30', completedOn: '',           masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
        { id: 'kh-cn-15', title: 'Write story-line document',                      description: '6-page narrative shared with clients.',                                                                  linkedStage: 'Concept Stage',    linkedActivity: 'Narrative Development',        assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-02-02', startDate: '2026-02-02', assignee: 'Meher Kapoor', status: 'todo',        dueDate: '2026-02-05', createdOn: '2026-02-02', completedOn: '',           masterRef: null, isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
        /* Deliverable: Cost Envelope → Activity: Indicative Costing */
        { id: 'kh-cn-16', title: 'Build order-of-magnitude budget',                description: 'Per-sqft rates × area × quality factor.',                                                                linkedStage: 'Concept Stage',    linkedActivity: 'Indicative Costing',           assigneeId: 2, assigneeName: 'Riya Sharma', assignedById: 2, assignedAt: '2026-02-05', startDate: '2026-02-05', assignee: 'Riya Sharma', status: 'todo',        dueDate: '2026-02-08', createdOn: '2026-02-05', completedOn: '',           masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
        { id: 'kh-cn-17', title: 'Validate against client\'s pocket',               description: 'Soft check — rough range only.',                                                                          linkedStage: 'Concept Stage',    linkedActivity: 'Indicative Costing',           assigneeId: 2, assigneeName: 'Riya Sharma', assignedById: 2, assignedAt: '2026-02-08', startDate: '2026-02-08', assignee: 'Riya Sharma', status: 'todo',        dueDate: '2026-02-10', createdOn: '2026-02-08', completedOn: '',           masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
        { id: 'kh-cn-18', title: 'Document indicative bracket for client',         description: '',                                                                                                       linkedStage: 'Concept Stage',    linkedActivity: 'Indicative Costing',           assigneeId: 2, assigneeName: 'Riya Sharma', assignedById: 2, assignedAt: '2026-02-10', startDate: '2026-02-10', assignee: 'Riya Sharma', status: 'todo',        dueDate: '2026-02-12', createdOn: '2026-02-10', completedOn: '',           masterRef: null, isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
        /* Deliverable: 3D Visualisation → Activity: Volumetric 3D */
        { id: 'kh-cn-19', title: 'Build SketchUp volumetric model',                description: 'Just masses + scale, not photoreal.',                                                                    linkedStage: 'Concept Stage',    linkedActivity: 'Volumetric 3D',                assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-02-12', startDate: '2026-02-12', assignee: 'Meher Kapoor', status: 'todo',        dueDate: '2026-02-15', createdOn: '2026-02-12', completedOn: '',           masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
        { id: 'kh-cn-20', title: 'Render quick volumetric views',                  description: 'Lower + Upper + Penthouse-top hero shots.',                                                              linkedStage: 'Concept Stage',    linkedActivity: 'Volumetric 3D',                assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-02-15', startDate: '2026-02-15', assignee: 'Meher Kapoor', status: 'todo',        dueDate: '2026-02-18', createdOn: '2026-02-15', completedOn: '',           masterRef: null, isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
        { id: 'kh-cn-21', title: 'Walkthrough video for client',                   description: '',                                                                                                       linkedStage: 'Concept Stage',    linkedActivity: 'Volumetric 3D',                assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-02-18', startDate: '2026-02-18', assignee: 'Meher Kapoor', status: 'todo',        dueDate: '2026-02-20', createdOn: '2026-02-18', completedOn: '',           masterRef: null, isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
        /* Deliverable: Special Recommendations → Activity: Bespoke Ideas */
        { id: 'kh-cn-22', title: 'Identify 3 bespoke moments unique to this home', description: 'Hand-painted ceiling · brass-mesh library wall · garden bedroom skylight.',                              linkedStage: 'Concept Stage',    linkedActivity: 'Bespoke Ideas',                assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-02-20', startDate: '2026-02-20', assignee: 'Meher Kapoor', status: 'todo',        dueDate: '2026-02-23', createdOn: '2026-02-20', completedOn: '',           masterRef: null, isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
        { id: 'kh-cn-23', title: 'Cost feasibility for each bespoke idea',         description: '',                                                                                                       linkedStage: 'Concept Stage',    linkedActivity: 'Bespoke Ideas',                assigneeId: 2, assigneeName: 'Riya Sharma', assignedById: 2, assignedAt: '2026-02-23', startDate: '2026-02-23', assignee: 'Riya Sharma', status: 'todo',        dueDate: '2026-02-25', createdOn: '2026-02-23', completedOn: '',           masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
        { id: 'kh-cn-24', title: 'Present bespoke ideas to client',                description: '',                                                                                                       linkedStage: 'Concept Stage',    linkedActivity: 'Bespoke Ideas',                assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-02-25', startDate: '2026-02-25', assignee: 'Meher Kapoor', status: 'todo',        dueDate: '2026-02-27', createdOn: '2026-02-25', completedOn: '',           masterRef: null, isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
      ],
      /* === Phase 9.1.15 — Stage-level deliverables (artifacts) === */
      projectDeliverables: [
        /* Onboarding Stage deliverables */
        { id: 'kh-dl-ob-1', linkedStage: 'Onboarding Stage', linkedActivity: 'Scope & Commercial Alignment', name: 'Signed scope note', format: 'Document', clientFacing: 'yes', status: 'approved', deliveredOn: '2025-12-07',
          attachments: [{ id: 'att-ob-1-1', name: 'Onboarding & Kick-Off — Signed scope note.pdf', size: '313' }] },
        { id: 'kh-dl-ob-2', linkedStage: 'Onboarding Stage', linkedActivity: 'Initial Client Brief Meeting', name: 'Client brief — captured inputs', format: 'Document', clientFacing: 'yes', status: 'delivered', deliveredOn: '2025-12-15',
          attachments: [{ id: 'att-ob-2-1', name: 'Initial Brief — Khanna Penthouse.pdf', size: '1843' }] },
        { id: 'kh-dl-ob-3', linkedStage: 'Onboarding Stage', linkedActivity: 'Site Survey', name: 'Site measurement drawings', format: 'Drawing', clientFacing: 'no', status: 'in_review', deliveredOn: '2025-12-12',
          attachments: [
            { id: 'att-ob-3-1', name: 'Site Measurement — Lower Level.dwg', size: '2400' },
            { id: 'att-ob-3-2', name: 'Site Measurement — Upper Level.dwg', size: '2150' },
            { id: 'att-ob-3-3', name: 'Site Measurement — Penthouse Top.dwg', size: '1980' },
          ] },
        { id: 'kh-dl-ob-4', linkedStage: 'Onboarding Stage', linkedActivity: 'Site Survey', name: 'Site photographs (existing condition)', format: 'Photo set', clientFacing: 'no', status: 'delivered', deliveredOn: '2025-12-11',
          attachments: [{ id: 'att-ob-4-1', name: 'Site Photos — 200 images.zip', size: '142000' }] },
        { id: 'kh-dl-ob-5', linkedStage: 'Onboarding Stage', linkedActivity: 'Feasibility Study', name: 'Feasibility study report', format: 'Report', clientFacing: 'yes', status: 'draft', deliveredOn: '',
          attachments: [] },
        /* Concept Stage deliverables */
        { id: 'kh-dl-cn-1', linkedStage: 'Concept Stage', linkedActivity: 'Mood Board Creation', name: '3 Concept mood boards', format: 'Board', clientFacing: 'yes', status: 'approved', deliveredOn: '2026-01-15',
          attachments: [{ id: 'att-cn-1-1', name: 'Concept Moodboard — Quiet Luxury Direction.pdf', size: '24600' }] },
        { id: 'kh-dl-cn-2', linkedStage: 'Concept Stage', linkedActivity: 'CMF Palette Compilation', name: 'CMF Palette + Material Library', format: 'Document + Sample', clientFacing: 'yes', status: 'approved', deliveredOn: '2026-01-19',
          attachments: [{ id: 'att-cn-2-1', name: 'CMF Palette + Material Library v2.pdf', size: '18200' }] },
        { id: 'kh-dl-cn-3', linkedStage: 'Concept Stage', linkedActivity: 'Design Style Definition', name: 'Style direction 1-pager', format: 'Document', clientFacing: 'yes', status: 'in_review', deliveredOn: '',
          attachments: [{ id: 'att-cn-3-1', name: 'Quiet Luxury — Style Direction draft.pdf', size: '4200' }] },
        { id: 'kh-dl-cn-4', linkedStage: 'Concept Stage', linkedActivity: 'Narrative Development', name: 'Story-line document', format: 'Document', clientFacing: 'yes', status: 'draft', deliveredOn: '',
          attachments: [] },
        { id: 'kh-dl-cn-5', linkedStage: 'Concept Stage', linkedActivity: 'Indicative Costing', name: 'Concept cost envelope', format: 'Document', clientFacing: 'yes', status: 'draft', deliveredOn: '',
          attachments: [] },
        { id: 'kh-dl-cn-6', linkedStage: 'Concept Stage', linkedActivity: 'Volumetric 3D', name: 'Volumetric walkthrough video', format: 'Render', clientFacing: 'yes', status: 'draft', deliveredOn: '',
          attachments: [] },
        { id: 'kh-dl-cn-7', linkedStage: 'Concept Stage', linkedActivity: 'Bespoke Ideas', name: 'Special recommendations deck', format: 'Document', clientFacing: 'yes', status: 'draft', deliveredOn: '',
          attachments: [] },
      ],
      projectApprovals: [
        { id: 'kh-ap-1', title: 'Concept Direction — Quiet Luxury (Approved)',  typeName: 'Concept Approval', linkedStage: 'Concept Development Stage', linkedActivity: 'Concept Direction', requestedFrom: 'Sara Khanna', raisedBy: 'Meher Kapoor', status: 'approved', clientFacing: 'yes', dueDate: '2026-01-22', raisedOn: '2026-01-15', decisionDate: '2026-01-21', decisionNotes: 'Approved enthusiastically. Sara requested 30% more brass touches across the design.', isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
        { id: 'kh-ap-2', title: 'DD Drawings — All Levels (Approved)',           typeName: 'Drawing Approval', linkedStage: 'Design Development Stage',  linkedActivity: 'Drawing Approvals', requestedFrom: 'Arjun Khanna', raisedBy: 'Meher Kapoor', status: 'approved', clientFacing: 'yes', dueDate: '2026-03-15', raisedOn: '2026-03-05', decisionDate: '2026-03-13', decisionNotes: 'All 38 drawings approved. Two minor markups: master closet door swing + powder room WC position.', isClientVisible: true, isVendorVisible: true, isInternalOnly: false },
        { id: 'kh-ap-3', title: 'Furniture Layout — Living Room (Pending)',     typeName: 'Layout Approval',  linkedStage: 'Site Supervision - Cilvil, Structure & MEP', linkedActivity: 'Furniture Layout', requestedFrom: 'Sara Khanna', raisedBy: 'Meher Kapoor', status: 'pending', clientFacing: 'yes', dueDate: '2026-05-18', raisedOn: '2026-05-08', decisionDate: '', decisionNotes: '', isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
      ],
      projectFiles: [
        { id: 'kh-fl-1',  name: 'Initial Brief — Khanna Penthouse.pdf',                              type: 'pdf',   size: '1.8 MB',  tag: 'briefing document',     stage: 'Onboarding Stage',                                  uploadedBy: 'Riya Sharma',  uploadedOn: '2025-12-09', clientApproved: true,  vendorAcknowledged: false, approvalStatus: 'approved' },
        { id: 'kh-fl-2',  name: 'Concept Moodboard — Quiet Luxury Direction.pdf',                   type: 'pdf',   size: '24.6 MB', tag: 'moodboard',              stage: 'Concept Development Stage',                         uploadedBy: 'Meher Kapoor', uploadedOn: '2026-01-12', clientApproved: true,  vendorAcknowledged: false, approvalStatus: 'approved' },
        { id: 'kh-fl-3',  name: 'CMF Palette + Material Library v2.pdf',                            type: 'pdf',   size: '18.2 MB', tag: 'material library',       stage: 'Concept Development Stage',                         uploadedBy: 'Meher Kapoor', uploadedOn: '2026-01-19', clientApproved: true,  vendorAcknowledged: false, approvalStatus: 'approved' },
        { id: 'kh-fl-4',  name: 'Schematic — All Levels Layout v3.dwg',                              type: 'dwg',   size: '4.4 MB',  tag: 'schematic drawing',     stage: 'Schematic Design Stage',                            uploadedBy: 'Meher Kapoor', uploadedOn: '2026-02-14', clientApproved: true,  vendorAcknowledged: true,  approvalStatus: 'approved' },
        { id: 'kh-fl-5',  name: 'DD Set — All Levels (38 drawings).pdf',                             type: 'pdf',   size: '92.4 MB', tag: 'DD drawing set',        stage: 'Design Development Stage',                          uploadedBy: 'Meher Kapoor', uploadedOn: '2026-03-08', clientApproved: true,  vendorAcknowledged: true,  approvalStatus: 'approved' },
        { id: 'kh-fl-6',  name: '3D Visualization — Living Room (Final).mp4',                        type: 'video', size: '142 MB',  tag: '3D visualization',       stage: 'Design Development Stage',                          uploadedBy: 'Meher Kapoor', uploadedOn: '2026-03-10', clientApproved: true,  vendorAcknowledged: false, approvalStatus: 'approved' },
        { id: 'kh-fl-7',  name: '3D Visualization — Master Suite.mp4',                              type: 'video', size: '128 MB',  tag: '3D visualization',       stage: 'Design Development Stage',                          uploadedBy: 'Meher Kapoor', uploadedOn: '2026-03-10', clientApproved: true,  vendorAcknowledged: false, approvalStatus: 'approved' },
        { id: 'kh-fl-8',  name: 'GFC Drawings — Lower Level (12 sheets).pdf',                       type: 'pdf',   size: '64.8 MB', tag: 'GFC drawings',          stage: 'GFC Drawings',                                      uploadedBy: 'Meher Kapoor', uploadedOn: '2026-04-15', clientApproved: false, vendorAcknowledged: true,  approvalStatus: 'released' },
        { id: 'kh-fl-9',  name: 'GFC Drawings — Upper Level (10 sheets).pdf',                       type: 'pdf',   size: '52.4 MB', tag: 'GFC drawings',          stage: 'GFC Drawings',                                      uploadedBy: 'Meher Kapoor', uploadedOn: '2026-04-15', clientApproved: false, vendorAcknowledged: true,  approvalStatus: 'released' },
        { id: 'kh-fl-10', name: 'GFC Drawings — Terrace + Outdoor (6 sheets).pdf',                  type: 'pdf',   size: '28.2 MB', tag: 'GFC drawings',          stage: 'GFC Drawings',                                      uploadedBy: 'Meher Kapoor', uploadedOn: '2026-04-18', clientApproved: false, vendorAcknowledged: true,  approvalStatus: 'released' },
        { id: 'kh-fl-11', name: 'BOQ Master — All Levels v4.xlsx',                                   type: 'xlsx',  size: '2.8 MB',  tag: 'BOQ',                   stage: 'BOQ & Budget Estimates',                            uploadedBy: 'Riya Sharma',  uploadedOn: '2026-04-22', clientApproved: true,  vendorAcknowledged: true,  approvalStatus: 'approved' },
        { id: 'kh-fl-12', name: 'Vendor Quotes Comparison — Civil Work.xlsx',                        type: 'xlsx',  size: '880 KB',  tag: 'vendor comparison',     stage: 'Tender Document',                                   uploadedBy: 'Riya Sharma',  uploadedOn: '2026-04-25', clientApproved: false, vendorAcknowledged: false, approvalStatus: 'internal' },
        { id: 'kh-fl-13', name: 'Site Photos — MEP First Fix Complete.jpg',                          type: 'image', size: '8.4 MB',  tag: 'site progress',          stage: 'Site Supervision - Cilvil, Structure & MEP',         uploadedBy: 'Devansh Iyer', uploadedOn: '2026-05-06', clientApproved: false, vendorAcknowledged: true,  approvalStatus: '' },
        { id: 'kh-fl-14', name: 'Material Sample Photos — Walnut Veneer Options.jpg',               type: 'image', size: '4.2 MB',  tag: 'material sample',        stage: 'Site Supervision - Cilvil, Structure & MEP',         uploadedBy: 'Meher Kapoor', uploadedOn: '2026-05-01', clientApproved: false, vendorAcknowledged: false, approvalStatus: 'pending', sentForApproval: true },
      ],
      comms: [
        { id: 'kh-cm-1', channel: 'Email',    from: 'Meher Kapoor', to: 'Sara Khanna', subject: 'Concept Moodboard ready for review',           preview: 'Hi Sara, the Quiet Luxury moodboard is ready. Three sub-directions explored — wanted to walk you through them in person. Free this Friday afternoon?',                                                                date: '2026-01-12', stage: 'Concept Development Stage',                          isPinned: true,  attachments: ['kh-fl-2'] },
        { id: 'kh-cm-2', channel: 'WhatsApp', from: 'Sara Khanna',  to: 'Meher Kapoor', subject: 'Loved the brass details',                       preview: 'Meher hi! Both Arjun and I really loved the brass touches in the moodboard — can we add more of it across the design? Especially for the bar nook and library wall.',                                            date: '2026-01-21', stage: 'Concept Development Stage',                          isPinned: true,  attachments: [] },
        { id: 'kh-cm-3', channel: 'WhatsApp', from: 'Sara Khanna',  to: 'Meher Kapoor', subject: 'Question about master bath marble',             preview: 'Quick one — for the Calacatta Viola in master bath, can we see physical samples this weekend? I want to make sure the purple veining is consistent across the slabs you\'ve identified.',                            date: '2026-04-29', stage: 'Site Supervision - Cilvil, Structure & MEP',         isPinned: false, attachments: [] },
        { id: 'kh-cm-4', channel: 'Email',    from: 'Riya Sharma',  to: 'Arjun Khanna', subject: 'Site progress update — Week 11',                preview: 'Hi Arjun, attaching site photos from this week. MEP first-fix is now complete across both levels. Walnut veneer panel installation begins next Tuesday. Two minor items needing your wife\'s decision attached.', date: '2026-05-06', stage: 'Site Supervision - Cilvil, Structure & MEP',         isPinned: false, attachments: ['kh-fl-13', 'kh-fl-14'] },
        { id: 'kh-cm-5', channel: 'WhatsApp', from: 'Devansh Iyer', to: 'Riya Sharma',  subject: 'Atlas crew query on terrace waterproofing',     preview: 'Riya didi, Atlas team asking if waterproofing test results can be shared with their site engineer before IPE order is placed. They want documentation for warranty.',                                              date: '2026-05-08', stage: 'Site Supervision - Cilvil, Structure & MEP',         isPinned: false, attachments: [] },
      ],
      siteUpdates: [
        { id: 'kh-su-1', date: '2026-04-15', title: 'Demolition + structural strip-out complete', description: 'All 3 levels stripped to bare structure. Existing partition walls demolished as per layout. No structural concerns. Ready for first-fix MEP.',                                                                              author: 'Devansh Iyer', stage: 'Site Supervision - Cilvil, Structure & MEP', category: 'Milestone' },
        { id: 'kh-su-2', date: '2026-05-06', title: 'MEP first-fix complete — both indoor levels', description: 'Electrical, plumbing, HVAC ducting, AV cabling all routed. Pressure tests passed. Photos shared with client. Walnut veneer team scheduled to begin Tuesday May 12.',                                                              author: 'Devansh Iyer', stage: 'Site Supervision - Cilvil, Structure & MEP', category: 'Progress' },
      ],
      moms: [
        { id: 'kh-mo-1', date: '2025-12-12', title: 'Project Kick-off Meeting',                      attendees: 'Arjun Khanna, Sara Khanna, Riya Sharma, Meher Kapoor', decisions: 'Project scope confirmed: 3-level penthouse, 7800 sqft. Quiet Luxury aesthetic with Indian Modern accents. Sara is the final aesthetic call. Project completion target: 15 Nov 2026. Total fee ₹68L.',                                                          stage: 'Onboarding Stage' },
        { id: 'kh-mo-2', date: '2026-01-21', title: 'Concept Approval Meeting',                      attendees: 'Arjun Khanna, Sara Khanna, Meher Kapoor',              decisions: 'Quiet Luxury direction approved. Sara requested 30% more brass detailing. CMF locked: warm woods (walnut + oak), travertine + statuario, fabric walls, brushed brass. No marble overload. Materials to highlight art collection.',                                  stage: 'Concept Development Stage' },
        { id: 'kh-mo-3', date: '2026-03-13', title: 'DD Sign-off Meeting',                            attendees: 'Arjun Khanna, Sara Khanna, Riya Sharma, Meher Kapoor', decisions: 'All 38 DD drawings approved. Two markups: master closet door swing changed to right-hand, powder room WC moved 200mm to gain ventilation clearance. Lighting selections confirmed including Magari chandelier on 16-week lead.',                              stage: 'Design Development Stage' },
        { id: 'kh-mo-4', date: '2026-04-22', title: 'BOQ + Vendor Awards Meeting',                    attendees: 'Arjun Khanna, Riya Sharma, Mahesh Krishnan (Atlas)',   decisions: 'BOQ totalling ₹2.85Cr (excluding design fee) approved. Atlas awarded civil + finishing. Sahil Bharti awarded custom joinery. Klove + Magari sourcing approved. Procurement schedule to track 18-week lead items: chandelier, kitchen, wardrobes.',         stage: 'BOQ & Budget Estimates' },
        { id: 'kh-mo-5', date: '2026-05-06', title: 'Site Walkthrough — MEP First Fix Sign-off',     attendees: 'Devansh Iyer, Mahesh Krishnan (Atlas), Riya Sharma',   decisions: 'MEP first-fix signed off across Lower + Upper levels. No reworks needed. Walnut veneer installation cleared to begin May 12. Terrace waterproofing test scheduled for May 22 before IPE decking begins.',                                            stage: 'Site Supervision - Cilvil, Structure & MEP' },
      ],
      projectStages: [],
    },
  },
  {
    id: 'STD-2025-014', name: 'Marwah Residence', category: 'Home Owner', propertyType: 'Villa',
    siteCondition: 'Brownfield – Renovation (Layout Changes Possible)',
    serviceType: 'Design + Build (Turnkey)', city: 'Mumbai', state: 'MH',
    startDate: '14 Jan 2026', expCompletion: '28 Aug 2026',
    currentStage: 'Design Development', status: 'on-track', progress: 42,
    pendingApprovals: 2, overdueTasks: 1, paymentDue: true,
    pm: 'Riya Sharma', pmInitials: 'RS', client: 'Aakash & Naina Marwah', accent: '#B4593C',
    _wizard: {
      primaryClientId: 1, /* → MasterClients[1] = Aakash Marwah */
      onboardingAttentionTags: ['Multiple stakeholders', 'High urgency'],
      clientFlags: ['Family approval required', 'Slow decision maker'],
      builtUpArea: '6200', numberOfLevels: '4',
      includedScope: 'Full interior design, custom joinery, lighting, soft furnishings, art curation.',
      excludedScope: 'Civil structural changes, exterior landscaping.',
      decisionMakers: [
        { name: 'Aakash Marwah', role: 'Owner', contact: '+91 98201 12345', email: 'aakash@marwah.in', commPref: ['WhatsApp', 'Email'] },
        { name: 'Naina Marwah', role: 'Spouse', contact: '+91 98201 67890', email: 'naina@marwah.in', commPref: ['WhatsApp'] },
        { name: 'Mr. Marwah Sr.', role: 'Father (final approval)', contact: '', email: '', commPref: ['Call'] },
      ],
      externalStakeholders: [
        { vendorId: 1, projectRole: 'Civil + finishing — primary contractor', projectNotes: 'Awarded after 3-vendor RFQ. Atlas PM is Mahesh Krishnan.' },
        { vendorId: 2, projectRole: 'Lighting design + selection', projectNotes: '' },
      ],
      paymentTerms: [
        { id: 'pmt-mr-1', name: 'Signing advance',     linkedStage: 'Onboarding Stage',           percentage: '15', amount: '900000',  amountManualOverride: false, targetDate: '2026-01-20', amountReceived: 900000,  receiptDate: '2026-02-05', triggerCondition: 'On signed contract',  reminderEnabled: false, reminderType: 'WhatsApp' },
        { id: 'pmt-mr-2', name: 'Concept signoff',     linkedStage: 'Concept Development Stage',  percentage: '20', amount: '1200000', amountManualOverride: false, targetDate: '2026-02-20', amountReceived: 1200000, receiptDate: '2026-03-15', triggerCondition: 'On client approval',  reminderEnabled: true,  reminderType: 'WhatsApp' },
        { id: 'pmt-mr-3', name: 'DD signoff',          linkedStage: 'Design Development Stage',   percentage: '25', amount: '1500000', amountManualOverride: false, targetDate: '2026-04-10', amountReceived: 0,       receiptDate: '',           triggerCondition: 'On stage completion', reminderEnabled: true,  reminderType: 'Email' },
        { id: 'pmt-mr-4', name: 'Procurement release', linkedStage: 'Site Administration & Coordination', percentage: '30', amount: '1800000', amountManualOverride: false, targetDate: '2026-06-01', amountReceived: 600000, receiptDate: '2026-05-10', triggerCondition: 'On stage start', reminderEnabled: true, reminderType: 'WhatsApp' },
        { id: 'pmt-mr-5', name: 'Handover balance',    linkedStage: 'Hand Over',                  percentage: '10', amount: '600000',  amountManualOverride: false, targetDate: '2026-08-25', amountReceived: 0,       receiptDate: '',           triggerCondition: 'On stage completion', reminderEnabled: true,  reminderType: 'Email' },
      ],
      totalProjectValue: '6000000',
      siteUpdates: [
        {
          id: 'su-mr-1', title: 'Ground floor demo started — load-bearing wall identified',
          category: 'Progress', date: '2026-02-12', author: 'Devansh Iyer (Site Manager)',
          spaceRef: 'Ground Floor → Living Room', photos: [
            { id: 'ph-mr-1', caption: 'Wall before demo' },
            { id: 'ph-mr-2', caption: 'Layout marking on floor' },
          ],
          clientNotes: 'Demo work started on schedule. The internal wall between living and dining is being assessed for removal — structural consultant visit booked for Friday.',
          internalNotes: 'Wall is load-bearing, contractor flagged column thickening required before removal. ₹40-50K extra in steel reinforcement, will surface in next variation order. Atlas Build PM aware.',
          isClientVisible: true, isVendorVisible: true, isInternalOnly: false,
        },
        {
          id: 'su-mr-2', title: 'Italian marble slab inspection — Statuario',
          category: 'Milestone', date: '2026-02-22', author: 'Meher Kapoor (Designer)',
          spaceRef: 'Living Room → Flooring', photos: [
            { id: 'ph-mr-3', caption: 'Slab 1 — vein matching front face' },
            { id: 'ph-mr-4', caption: 'Slab 2 — book-match candidate' },
            { id: 'ph-mr-5', caption: 'Vendor warehouse view' },
          ],
          clientNotes: 'Inspected 4 slabs at the vendor warehouse. Selected 2 with the cleanest veining for the living room floor — book-matching planned at the central lounge zone. Photos attached for your records.',
          internalNotes: 'Vendor pricing held at ₹950/sqft despite supply tightness. Backup quarry contact saved if these don\'t hold cure. Slab thickness verified at 18mm — within spec.',
          isClientVisible: true, isVendorVisible: true, isInternalOnly: false,
        },
        {
          id: 'su-mr-3', title: 'Master bedroom wardrobe — joinery delay flag',
          category: 'Issue', date: '2026-03-05', author: 'Devansh Iyer (Site Manager)',
          spaceRef: 'First Floor → Master Bedroom → Wardrobe', photos: [
            { id: 'ph-mr-6', caption: 'Vendor workshop — partial frame' },
          ],
          clientNotes: 'Master bedroom wardrobe joinery is delayed by approximately one week. Vendor is sourcing replacement Hettich hinges that meet the original soft-close spec. New delivery date: 18 March. We will recover the lost time in the parallel-track painting work.',
          internalNotes: 'Vendor screwed up the original Hettich PO — wrong hinge series shipped from Pune. They\'re absorbing the cost of replacement (₹14K worth of hardware) plus expediting fee. If this happens again with their 2nd commitment we should escalate to their MD.',
          isClientVisible: true, isVendorVisible: false, isInternalOnly: false,
        },
      ],
      comms: [
        {
          id: 'cm-mr-1',
          author: 'Riya Sharma (Project Manager)',
          body: 'Kicking off internal coord — Atlas needs the structural consultant report by EOW or wall demo gets delayed. I\'ll chase Anil tomorrow.',
          timestamp: '2026-02-10T14:32:00.000Z',
          internalAnnotation: '',
          isClientVisible: false, isVendorVisible: false, isInternalOnly: true,
        },
        {
          id: 'cm-mr-2',
          author: 'Riya Sharma (Project Manager)',
          body: 'Hi Aakash — checking in ahead of Friday\'s site visit. Confirming 11am, our structural consultant Anil joining. Brief agenda: walk the ground floor demo zone, review the proposed wall removal, sign off on column thickening if everyone\'s aligned. We\'ll have the marble samples on site as well for your selection.',
          timestamp: '2026-02-13T09:15:00.000Z',
          internalAnnotation: 'Worth flagging to client team that wall removal is now contingent on consultant signoff — manage expectations.',
          isClientVisible: true, isVendorVisible: false, isInternalOnly: false,
        },
        {
          id: 'cm-mr-3',
          author: 'Atlas Build (Vendor)',
          body: 'Confirmed Friday 11am attendance. We\'ll have demolition crew on standby — if signoff happens that day we can start by Monday. Steel reinforcement quote attached separately, will share by Wednesday EOD.',
          timestamp: '2026-02-13T15:42:00.000Z',
          internalAnnotation: '',
          isClientVisible: true, isVendorVisible: true, isInternalOnly: false,
        },
        {
          id: 'cm-mr-4',
          author: 'Meher Kapoor (Designer)',
          body: 'Need a heads up — vendor is dragging on the wardrobe Hettich hinge replacement. I\'m holding the door delivery until they confirm new ETA. Riya, fyi for client comms.',
          timestamp: '2026-03-04T11:20:00.000Z',
          internalAnnotation: '',
          isClientVisible: false, isVendorVisible: false, isInternalOnly: true,
        },
        {
          id: 'cm-mr-5',
          author: 'Riya Sharma (Project Manager)',
          body: 'Aakash — small update on the master bedroom wardrobe. Vendor had a hardware issue and we\'re holding delivery by ~1 week to make sure the soft-close mechanism is exactly to spec. Posting a site update with details. No project-level timeline impact, we\'re absorbing it via parallel work.',
          timestamp: '2026-03-05T16:00:00.000Z',
          internalAnnotation: 'Dont mention vendor name in client comms unless asked.',
          isClientVisible: true, isVendorVisible: false, isInternalOnly: false,
        },
      ],
      moms: [
        {
          id: 'mom-mr-1',
          title: 'Concept review + material direction signoff',
          type: 'Client Review',
          date: '2026-01-22',
          time: '11:00',
          location: 'Studio (Bandra office)',
          attendees: [
            { id: 'att-mr-1-1', name: 'Aanya Sharma (Founder)', present: true },
            { id: 'att-mr-1-2', name: 'Riya Sharma (Project Manager)', present: true },
            { id: 'att-mr-1-3', name: 'Meher Kapoor (Designer)', present: true },
            { id: 'att-mr-1-4', name: 'Aakash Marwah (Client)', present: true },
            { id: 'att-mr-1-5', name: 'Priya Marwah (Client)', present: true },
            { id: 'att-mr-1-6', name: 'Vikram Marwah (Client father)', present: false },
          ],
          agendaItems: [
            { id: 'ag-mr-1-1', text: 'Walk-through of concept boards (Heritage / Coastal / Modern)' },
            { id: 'ag-mr-1-2', text: 'Material library — stones, woods, finishes' },
            { id: 'ag-mr-1-3', text: 'Layout discussion — living room expansion option' },
            { id: 'ag-mr-1-4', text: 'Budget envelope confirmation' },
            { id: 'ag-mr-1-5', text: 'Next stage: DD timeline' },
          ],
          decisions: [
            { id: 'dc-mr-1-1', text: 'Heritage concept selected as primary direction. Coastal elements to be incorporated in master bedroom only.', linkedApprovalId: null },
            { id: 'dc-mr-1-2', text: 'Italian marble (Statuario) approved for living room flooring. Vendor sourcing to begin.', linkedApprovalId: null },
            { id: 'dc-mr-1-3', text: 'Living room wall removal — exploration approved, contingent on structural consultant signoff.', linkedApprovalId: null },
          ],
          actionItems: [
            { id: 'ai-mr-1-1', text: 'Engage structural consultant for load-bearing wall assessment', assignee: 'Team: Riya Sharma (PM)', dueDate: '2026-02-05', linkedTaskId: null },
            { id: 'ai-mr-1-2', text: 'Source 4-6 marble slab samples from vendor for in-person review', assignee: 'Team: Meher Kapoor (Designer)', dueDate: '2026-02-12', linkedTaskId: null },
            { id: 'ai-mr-1-3', text: 'Share revised DD program with milestones', assignee: 'Team: Riya Sharma (PM)', dueDate: '2026-01-29', linkedTaskId: null },
          ],
          clientNotes: 'Excellent session — alignment on direction and material palette. Heritage with Sabyasachi/Nilaya wallpaper as the foyer accent. Marble selection to follow vendor visit. Wall-removal feasibility next on the critical path.',
          internalNotes: 'Vikram (father) absent — Aakash mentioned he\'ll need a separate walkthrough. Priya pushed back gently on the marble selection rate (₹950/sqft); managed it by emphasizing the book-matching technique value. Meher to prep alternate options at ₹650-750 range as backup.',
          isClientVisible: true, isVendorVisible: false, isInternalOnly: false,
        },
        {
          id: 'mom-mr-2',
          title: 'Site visit + structural consultant walkthrough',
          type: 'Site Visit',
          date: '2026-02-13',
          time: '11:00',
          location: '14B Marwah Apartments, Bandra West',
          attendees: [
            { id: 'att-mr-2-1', name: 'Riya Sharma (Project Manager)', present: true },
            { id: 'att-mr-2-2', name: 'Devansh Iyer (Site Manager)', present: true },
            { id: 'att-mr-2-3', name: 'Anil Kulkarni (Structural Consultant)', present: true },
            { id: 'att-mr-2-4', name: 'Aakash Marwah (Client)', present: true },
            { id: 'att-mr-2-5', name: 'Atlas Build PM (Vendor)', present: true },
          ],
          agendaItems: [
            { id: 'ag-mr-2-1', text: 'Walk demo zone (Living + Dining)' },
            { id: 'ag-mr-2-2', text: 'Structural assessment — load-bearing wall' },
            { id: 'ag-mr-2-3', text: 'Marble slab review (3 options on site)' },
            { id: 'ag-mr-2-4', text: 'Demolition signoff + commencement timeline' },
          ],
          decisions: [
            { id: 'dc-mr-2-1', text: 'Wall removal approved with column thickening. Steel reinforcement spec to be issued by Atlas next week.', linkedApprovalId: null },
            { id: 'dc-mr-2-2', text: 'Statuario slabs — Slab 1 and Slab 2 selected for living room book-match.', linkedApprovalId: null },
            { id: 'dc-mr-2-3', text: 'Demolition cleared to start Monday Feb 17.', linkedApprovalId: null },
          ],
          actionItems: [
            { id: 'ai-mr-2-1', text: 'Issue steel reinforcement quote with timeline and cost', assignee: 'External: Atlas Build (Vendor)', dueDate: '2026-02-19', linkedTaskId: null },
            { id: 'ai-mr-2-2', text: 'Reserve Slab 1 + Slab 2 with vendor; advance ₹50K', assignee: 'Team: Riya Sharma (PM)', dueDate: '2026-02-15', linkedTaskId: null },
            { id: 'ai-mr-2-3', text: 'Prepare variation order documentation for column thickening cost', assignee: 'Team: Riya Sharma (PM)', dueDate: '2026-02-22', linkedTaskId: null },
          ],
          clientNotes: 'Productive site visit. Wall removal cleared with structural mitigation. Marble slabs locked. Demolition starts Monday — site manager Devansh will share progress updates throughout. Variation order for steel reinforcement coming separately.',
          internalNotes: 'Atlas tried to inflate the steel quote on the spot — verbal ₹85K, written quote needed. If they come back high, Anil has a recommended fabricator we can use as comp. Aakash didnt push back on the variation cost — keep that line open without overplaying.',
          isClientVisible: true, isVendorVisible: true, isInternalOnly: false,
        },
      ],
      projectTasks: [
        { id: 'tk-mr-1', title: 'Issue formal variation order for steel reinforcement', description: 'Document the structural mitigation cost from Atlas — written quote, scope, signoff route.', linkedStage: 'Working Drawings', linkedActivity: 'Variation orders', assigneeId: 2, assigneeName: 'Riya Sharma', assignedById: 1, assignedAt: '2026-05-02', assignee: 'Riya Sharma', status: 'in_progress', dueDate: '2026-05-08', createdOn: '2026-05-02', completedOn: '', masterRef: null, remindAt: '2026-05-06', reminderChannel: 'inapp', reminderDismissed: false, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
        { id: 'tk-mr-2', title: 'Finalise master bedroom wardrobe joinery drawings', description: 'Update wardrobe sections after Hettich hinge change — re-issue to Atlas joinery team.', linkedStage: 'Working Drawings', linkedActivity: 'Joinery details', assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 1, assignedAt: '2026-05-03', assignee: 'Meher Kapoor', status: 'todo', dueDate: '2026-05-12', createdOn: '2026-05-03', completedOn: '', masterRef: null, isClientVisible: false, isVendorVisible: true, isInternalOnly: false },
        { id: 'tk-mr-3', title: 'Site visit — verify marble book-matching at Atlas warehouse', description: 'Confirm the two Statuario slabs are book-matched correctly for living room layout.', linkedStage: 'Procurement', linkedActivity: 'Vendor coordination', assigneeId: 4, assigneeName: 'Devansh Iyer', assignedById: 2, assignedAt: '2026-04-22', assignee: 'Devansh Iyer', status: 'todo', dueDate: '2026-04-28', createdOn: '2026-04-22', completedOn: '', masterRef: null, isClientVisible: true, isVendorVisible: true, isInternalOnly: false },
        { id: 'tk-mr-4', title: 'Send concept presentation to Mr. Marwah Sr.', description: 'Final family approval — schedule call with Aakash + Naina + Mr. Marwah Sr.', linkedStage: 'Concept', linkedActivity: 'Client presentation', assigneeId: 2, assigneeName: 'Riya Sharma', assignedById: 1, assignedAt: '2026-04-08', assignee: 'Riya Sharma', status: 'done', dueDate: '2026-04-15', createdOn: '2026-04-08', completedOn: '2026-04-14', masterRef: null, isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
      ],
      projectApprovals: [
        { id: 'ap-mr-1', title: 'Living room wall removal — structural mitigation cost ₹85K', typeName: 'Variation Order', linkedStage: 'Working Drawings', linkedActivity: 'Variation orders', requestedFrom: 'Aakash Marwah', raisedBy: 'Riya Sharma', status: 'pending', clientFacing: 'yes', dueDate: '2026-05-09', raisedOn: '2026-05-01', decisionDate: '', decisionNotes: '', isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
        { id: 'ap-mr-2', title: 'Master bedroom wardrobe — Hettich Series-90 vs Series-100', typeName: 'Spec Approval', linkedStage: 'Working Drawings', linkedActivity: 'Joinery details', requestedFrom: 'Aakash Marwah', raisedBy: 'Meher Kapoor', status: 'pending', clientFacing: 'yes', dueDate: '2026-05-15', raisedOn: '2026-05-03', decisionDate: '', decisionNotes: '', isClientVisible: true, isVendorVisible: true, isInternalOnly: false },
        { id: 'ap-mr-3', title: 'Concept design freeze — final layout', typeName: 'Stage Signoff', linkedStage: 'Concept', linkedActivity: 'Client presentation', requestedFrom: 'Mr. Marwah Sr.', raisedBy: 'Riya Sharma', status: 'approved', clientFacing: 'yes', dueDate: '2026-04-15', raisedOn: '2026-04-08', decisionDate: '2026-04-14', decisionNotes: 'Approved with one change — guest bath fixtures upgraded to TOTO from original Kohler spec.', isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
      ],
      projectLevels: [
        { id: 'lv-mr-1', name: 'Ground Floor', masterRef: 1, levelType: 'Ground', levelOrder: 0, expanded: true, zones: [
          { id: 'zn-mr-1', name: 'Public Areas', masterRef: 1, expanded: true, spaces: [
            { id: 'sp-mr-1', name: 'Foyer', masterRef: 1, expanded: false, features: [
              { id: 'ft-mr-1', name: 'Wall Treatment', masterRef: 1, expanded: false, elements: [
                { id: 'el-mr-1', name: 'Wallpaper', masterRef: 3, expanded: false,
                  specs: [{ id: 'sc-mr-1', name: 'Sabyasachi for Nilaya — Heritage', masterRef: null, unit: 'sqft', baseRate: '420' }],
                  checklists: [], drawings: [], references: [], boqItems: [],
                },
              ]},
            ]},
            { id: 'sp-mr-2', name: 'Living Room', masterRef: 2, expanded: true, features: [
              { id: 'ft-mr-2', name: 'Wall Treatment', masterRef: 1, expanded: true, elements: [
                { id: 'el-mr-2', name: 'Wall Paint', masterRef: 1, expanded: true,
                  specs: [
                    { id: 'sc-mr-2', name: 'Asian Royale Aspira — Matte White', masterRef: 1, unit: '—', baseRate: '' },
                    { id: 'sc-mr-3', name: 'Berger Silk Glamor — Off White (accent wall)', masterRef: 2, unit: '—', baseRate: '' },
                    { id: 'sc-mr-4', name: 'Texture finish — Lime Wash (feature wall)', masterRef: 3, unit: '—', baseRate: '' },
                  ],
                  checklists: [
                    { id: 'ch-mr-1', name: 'Wall paint QA — surface prep + coats', masterRef: null, description: 'Wall sanded, primer applied, 2 coats verified, drying time observed between coats.' },
                  ],
                  drawings: [
                    { id: 'dr-mr-1', name: 'Living Room — North Elevation', masterRef: 3, drawingType: 'Elevation', status: 'Approved', revision: 'R2', description: 'Material callouts, paint codes per wall.' },
                    { id: 'dr-mr-2', name: 'Living Room — Paint Schedule', masterRef: null, drawingType: 'Schedule', status: 'Issued', revision: 'R1', description: 'Wall-by-wall paint code reference table.' },
                  ],
                  references: [
                    { id: 'rf-mr-1', name: 'Pinterest — Warm Living Room Mood', masterRef: 1, referenceType: 'Inspiration', description: 'Client-approved mood image. Warm whites with terracotta accent wall.', url: 'https://pinterest.com/pin/example' },
                    { id: 'rf-mr-2', name: 'Asian Paints — Color Card', masterRef: 3, referenceType: 'Catalogue', description: 'Royale Aspira range. Code 7723 selected.', url: '' },
                  ],
                  boqItems: [
                    { id: 'bq-mr-1', name: 'Wall Paint — 2 coat application', masterRef: 1, unit: 'sqft', quantity: '420', rate: '18', category: 'Finish' },
                  ],
                },
                { id: 'el-mr-3', name: 'Wall Cladding', masterRef: 2, expanded: false,
                  specs: [{ id: 'sc-mr-5', name: 'Veneer — Walnut Polished (TV wall)', masterRef: 8, unit: 'sqft', baseRate: '680' }],
                  checklists: [], drawings: [], references: [], boqItems: [],
                },
              ]},
              { id: 'ft-mr-3', name: 'Flooring', masterRef: 2, expanded: false, elements: [
                { id: 'el-mr-4', name: 'Marble', masterRef: 4, expanded: false,
                  specs: [
                    { id: 'sc-mr-6', name: 'Italian Marble — Statuario', masterRef: 4, unit: 'sqft', baseRate: '850' },
                  ],
                  checklists: [], drawings: [], references: [],
                  boqItems: [
                    { id: 'bq-mr-2', name: 'Italian Marble flooring laid', masterRef: 2, unit: 'sqft', quantity: '320', rate: '950', category: 'Stone' },
                  ],
                },
              ]},
              { id: 'ft-mr-4', name: 'Lighting', masterRef: 3, expanded: false, elements: [
                { id: 'el-mr-5', name: 'Chandelier', masterRef: 6, expanded: false,
                  specs: [], checklists: [], drawings: [], references: [], boqItems: [],
                },
                { id: 'el-mr-6', name: 'Cove Lighting', masterRef: 7, expanded: false,
                  specs: [], checklists: [], drawings: [], references: [],
                  boqItems: [{ id: 'bq-mr-3', name: 'Cove lighting — installed', masterRef: 8, unit: 'rft', quantity: '85', rate: '450', category: 'Lighting' }],
                },
              ]},
            ]},
            { id: 'sp-mr-3', name: 'Dining', masterRef: 3, expanded: false, features: [] },
          ]},
          { id: 'zn-mr-2', name: 'Wet Areas', masterRef: 2, expanded: false, spaces: [
            { id: 'sp-mr-4', name: 'Powder Room', masterRef: 4, expanded: false, features: [] },
            { id: 'sp-mr-5', name: 'Kitchen', masterRef: 5, expanded: false, features: [
              { id: 'ft-mr-5', name: 'Cabinetry', masterRef: 16, expanded: false, elements: [
                { id: 'el-mr-7', name: 'Base Cabinets', masterRef: 17, expanded: false,
                  specs: [{ id: 'sc-mr-7', name: 'PU Lacquer — Matte White', masterRef: 7, unit: 'sqft', baseRate: '450' }],
                  checklists: [], drawings: [], references: [], boqItems: [],
                },
              ]},
            ]},
          ]},
        ]},
        { id: 'lv-mr-2', name: 'First Floor', masterRef: 2, levelType: 'Upper', levelOrder: 1, expanded: false, zones: [
          { id: 'zn-mr-3', name: 'Private Areas', masterRef: 3, expanded: false, spaces: [
            { id: 'sp-mr-6', name: 'Master Bedroom', masterRef: 6, expanded: false, features: [
              { id: 'ft-mr-6', name: 'Wardrobe', masterRef: 8, expanded: false, elements: [
                { id: 'el-mr-8', name: 'Wardrobe Shutter', masterRef: 9, expanded: false,
                  specs: [
                    { id: 'sc-mr-8', name: 'PU Lacquer — Matte White', masterRef: 7, unit: 'sqft', baseRate: '450' },
                    { id: 'sc-mr-9', name: 'Veneer — Walnut Polished (handle inset)', masterRef: 8, unit: 'sqft', baseRate: '680' },
                  ],
                  checklists: [
                    { id: 'ch-mr-2', name: 'QA before delivery — joinery', masterRef: 1, description: 'Inspection points before shutter leaves vendor: alignment, finish, hardware, soft-close.' },
                  ],
                  drawings: [
                    { id: 'dr-mr-3', name: 'Master BR Wardrobe — Joinery Detail', masterRef: 5, drawingType: 'Detail', status: 'Approved', revision: 'R3', description: '1:5 scale joinery detail with shutter section, hinge spec, edge profile.' },
                    { id: 'dr-mr-4', name: 'Master BR Wardrobe — Elevation', masterRef: 3, drawingType: 'Elevation', status: 'Issued', revision: 'R2', description: 'Full wall elevation with shutter divisions and material callouts.' },
                  ],
                  references: [
                    { id: 'rf-mr-3', name: 'Vendor catalogue — Hettich soft-close', masterRef: 3, referenceType: 'Catalogue', description: 'Page 47 — Sensys 8675i hinge spec.', url: '' },
                    { id: 'rf-mr-4', name: 'Material sample — PU Matte White', masterRef: 2, referenceType: 'Physical', description: 'Sample swatch on site, client signed off 22 Feb.', url: '' },
                  ],
                  boqItems: [
                    { id: 'bq-mr-4', name: 'PU lacquer joinery — sprayed', masterRef: 4, unit: 'sqft', quantity: '128', rate: '480', category: 'Joinery' },
                  ],
                },
                { id: 'el-mr-9', name: 'Wardrobe Internals', masterRef: 10, expanded: false,
                  specs: [], checklists: [], drawings: [], references: [], boqItems: [],
                },
              ]},
            ]},
            { id: 'sp-mr-7', name: "Children's Room", masterRef: 7, expanded: false, features: [] },
          ]},
          { id: 'zn-mr-4', name: 'Wet Areas', masterRef: 4, expanded: false, spaces: [
            { id: 'sp-mr-8', name: 'Master Bathroom', masterRef: 8, expanded: false, features: [
              { id: 'ft-mr-7', name: 'Sanitary Ware', masterRef: 13, expanded: false, elements: [
                { id: 'el-mr-10', name: 'WC', masterRef: 14, expanded: false,
                  specs: [{ id: 'sc-mr-10', name: 'Kohler Veil — Wall Hung WC', masterRef: 10, unit: 'no', baseRate: '42000' }],
                  checklists: [{ id: 'ch-mr-3', name: 'Site QC — sanitary fitment', masterRef: 2, description: 'Plumbing alignment, sealant quality, level check.' }],
                  drawings: [], references: [],
                  boqItems: [{ id: 'bq-mr-5', name: 'Kohler Veil WC — supplied & installed', masterRef: null, unit: 'no', quantity: '1', rate: '42000', category: 'Sanitary' }],
                },
              ]},
            ]},
          ]},
        ]},
        { id: 'lv-mr-3', name: 'Second Floor', masterRef: 3, levelType: 'Upper', levelOrder: 2, expanded: false, zones: [
          { id: 'zn-mr-5', name: 'Private Areas', masterRef: 5, expanded: false, spaces: [
            { id: 'sp-mr-9', name: 'Guest Bedroom', masterRef: 10, expanded: false, features: [] },
            { id: 'sp-mr-10', name: 'Study', masterRef: 11, expanded: false, features: [] },
          ]},
        ]},
        { id: 'lv-mr-4', name: 'Roof / Terrace', masterRef: 4, levelType: 'Roof', levelOrder: 3, expanded: false, zones: [
          { id: 'zn-mr-6', name: 'Outdoor Areas', masterRef: 7, expanded: false, spaces: [
            { id: 'sp-mr-11', name: 'Garden', masterRef: 14, expanded: false, features: [] },
            { id: 'sp-mr-12', name: 'Terrace', masterRef: 15, expanded: false, features: [] },
          ]},
        ]},
      ],
    },
  },
  {
    id: 'STD-2025-015', name: 'Kavi Coffee — Bandra Flagship', category: 'F&B', propertyType: 'Café',
    siteCondition: 'Bare Shell – Completed',
    serviceType: 'Design + Technical Drawing + Consultation + Procurement',
    city: 'Mumbai', state: 'MH', startDate: '02 Feb 2026', expCompletion: '15 Jul 2026',
    currentStage: 'Working Drawings', status: 'on-track', progress: 58,
    pendingApprovals: 1, overdueTasks: 0, paymentDue: false,
    pm: 'Devansh Iyer', pmInitials: 'DI', client: 'Kavi Hospitality LLP', accent: '#6B7355',
    _wizard: {
      primaryClientId: 2, /* → MasterClients[2] = Karan Vij */
      onboardingAttentionTags: ['Budget sensitive'],
      clientFlags: ['Committee approval'],
      builtUpArea: '1850', numberOfLevels: '2',
      includedScope: 'Full interior fitout — counter, seating, kitchen layout, lighting, signage.',
      decisionMakers: [
        { name: 'Karan Vij', role: 'Founder', contact: '+91 98330 44556', email: 'karan@kavi.coffee', commPref: ['WhatsApp', 'Email'] },
        { name: 'Anaya Vij', role: 'Co-founder · F&B operations', contact: '+91 98330 88990', email: 'anaya@kavi.coffee', commPref: ['Email'] },
      ],
      externalStakeholders: [
        { vendorId: 3, projectRole: 'Espresso machines + grinders + bar equipment', projectNotes: 'La Marzocco Linea PB selected. Lead time 12 weeks ex-Italy.' },
        { vendorId: 6, projectRole: 'Acoustic consultancy — café envelope', projectNotes: 'Engaged for sound dampening on the high-ceiling seating area.' },
      ],
      paymentTerms: [
        { id: 'pmt-kv-1', name: 'Signing advance',  linkedStage: 'Onboarding Stage',           percentage: '20', amount: '350000', amountManualOverride: false, targetDate: '2026-01-15', amountReceived: 350000, receiptDate: '2026-01-10', triggerCondition: 'On signed contract',  reminderEnabled: true, reminderType: 'WhatsApp' },
        { id: 'pmt-kv-2', name: 'Concept + DD',     linkedStage: 'Design Development Stage',   percentage: '40', amount: '700000', amountManualOverride: false, targetDate: '2026-03-01', amountReceived: 700000, receiptDate: '2026-02-25', triggerCondition: 'On stage completion', reminderEnabled: true, reminderType: 'Email' },
        { id: 'pmt-kv-3', name: 'GFC Drawings',     linkedStage: 'GFC Drawings',               percentage: '30', amount: '525000', amountManualOverride: false, targetDate: '2026-04-15', amountReceived: 525000, receiptDate: '2026-04-13', triggerCondition: 'On stage completion', reminderEnabled: true, reminderType: 'Email' },
        { id: 'pmt-kv-4', name: 'Handover',         linkedStage: 'Hand Over',                  percentage: '10', amount: '175000', amountManualOverride: false, targetDate: '2026-05-15', amountReceived: 0,      receiptDate: '',           triggerCondition: 'On stage completion', reminderEnabled: true, reminderType: 'WhatsApp' },
      ],
      totalProjectValue: '1750000',
      siteUpdates: [
        {
          id: 'su-kv-1', title: 'Counter mockup approved by Kavi team',
          category: 'Milestone', date: '2026-02-28', author: 'Meher Kapoor (Designer)',
          spaceRef: 'Customer Areas → Counter', photos: [
            { id: 'ph-kv-1', caption: 'Counter mockup at workshop' },
            { id: 'ph-kv-2', caption: 'Brass inlay detail' },
          ],
          clientNotes: 'The counter mockup was approved by your team in today\'s walkthrough. We\'re proceeding with full production. The brass inlay detail looks even better in person — final installation expected by end of March.',
          internalNotes: 'Client loved it. Vendor needs to commit to the brass supplier (Pune lead-time concern). Worth pre-ordering the inlay strip if final go.',
          isClientVisible: true, isVendorVisible: true, isInternalOnly: false,
        },
        {
          id: 'su-kv-2', title: 'Mezzanine staircase — design revision required',
          category: 'Issue', date: '2026-03-04', author: 'Devansh Iyer (Site Manager)',
          spaceRef: 'Mezzanine', photos: [],
          clientNotes: 'During on-site review we found the original staircase design conflicts with the new BMC code on rise/tread proportions. Working on a revised design now — will have updated drawings to share by Friday. No timeline impact.',
          internalNotes: 'Architect missed the BMC update from Jan 2026. Embarrassing. Revising drawings free of charge. Risk: client may ask why this wasn\'t caught — have the response ready.',
          isClientVisible: true, isVendorVisible: false, isInternalOnly: false,
        },
      ],
      comms: [
        {
          id: 'cm-kv-1',
          author: 'Devansh Iyer (Site Manager)',
          body: 'Counter mockup approved on Saturday. Brass inlay supplier (Pune) is the long-pole — need to commit by Wednesday or we slip cabinetry install.',
          timestamp: '2026-03-01T10:00:00.000Z',
          internalAnnotation: '',
          isClientVisible: false, isVendorVisible: false, isInternalOnly: true,
        },
        {
          id: 'cm-kv-2',
          author: 'Meher Kapoor (Designer)',
          body: 'Hi Kavi team — confirming the counter mockup signoff yesterday, thanks for making the time. We\'re proceeding with full production. Brass inlay strip ordered. Targeting end of March for the install. I\'ll share next milestone update by Friday.',
          timestamp: '2026-03-02T14:30:00.000Z',
          internalAnnotation: '',
          isClientVisible: true, isVendorVisible: true, isInternalOnly: false,
        },
      ],
      moms: [
        {
          id: 'mom-kv-1',
          title: 'Counter mockup walkthrough + production go-ahead',
          type: 'Client Review',
          date: '2026-03-01',
          time: '10:00',
          location: 'Vendor workshop, Bhandup',
          attendees: [
            { id: 'att-kv-1-1', name: 'Meher Kapoor (Designer)', present: true },
            { id: 'att-kv-1-2', name: 'Devansh Iyer (Site Manager)', present: true },
            { id: 'att-kv-1-3', name: 'Kavi (Founder)', present: true },
            { id: 'att-kv-1-4', name: 'Joinery Vendor PM', present: true },
          ],
          agendaItems: [
            { id: 'ag-kv-1-1', text: 'Counter mockup review at workshop' },
            { id: 'ag-kv-1-2', text: 'Brass inlay detail finalisation' },
            { id: 'ag-kv-1-3', text: 'Production timeline + install slot' },
          ],
          decisions: [
            { id: 'dc-kv-1-1', text: 'Counter mockup approved as-is. Full production cleared.', linkedApprovalId: null },
            { id: 'dc-kv-1-2', text: 'Brass inlay strip — Pune supplier confirmed. Pre-order placed.', linkedApprovalId: null },
          ],
          actionItems: [
            { id: 'ai-kv-1-1', text: 'Place full PO for counter joinery production', assignee: 'External: Joinery Vendor', dueDate: '2026-03-05', linkedTaskId: null },
            { id: 'ai-kv-1-2', text: 'Confirm install date in cabinetry schedule', assignee: 'Team: Devansh Iyer (Site)', dueDate: '2026-03-08', linkedTaskId: null },
          ],
          clientNotes: 'Counter mockup approved. Brass inlay locked. Production starts immediately, install targeted end of March.',
          internalNotes: 'Vendor was nervous about the brass inlay timeline. Pre-ordering inlay was a good move — saved us a 2-week slip.',
          isClientVisible: true, isVendorVisible: true, isInternalOnly: false,
        },
      ],
      projectTasks: [
        { id: 'tk-kv-1', title: 'Acoustic panel installation supervision', description: 'Studio Acoustics arrives 12 May for ceiling baffles — site manager to be on-site for first day.', linkedStage: 'Execution', linkedActivity: 'Site coordination', assigneeId: 4, assigneeName: 'Devansh Iyer', assignedById: 2, assignedAt: '2026-05-04', assignee: 'Devansh Iyer', status: 'todo', dueDate: '2026-05-12', createdOn: '2026-05-04', completedOn: '', masterRef: null, isClientVisible: false, isVendorVisible: true, isInternalOnly: false },
        { id: 'tk-kv-2', title: 'Espresso Italia — pre-installation site readiness check', description: 'Confirm electrical rough-ins are aligned with La Marzocco machine spec sheet (3-phase, water tap location).', linkedStage: 'Working Drawings', linkedActivity: 'MEP coordination', assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-05-01', assignee: 'Meher Kapoor', status: 'in_progress', dueDate: '2026-05-06', createdOn: '2026-05-01', completedOn: '', masterRef: null, remindAt: '2026-05-04', reminderChannel: 'inapp', reminderDismissed: false, isClientVisible: false, isVendorVisible: true, isInternalOnly: false },
        { id: 'tk-kv-3', title: 'Brand signage final artwork — vendor handoff', description: 'Send approved artwork to fabricator. Material: brushed brass, 14mm depth.', linkedStage: 'Procurement', linkedActivity: 'Vendor coordination', assigneeId: 2, assigneeName: 'Riya Sharma', assignedById: 1, assignedAt: '2026-04-12', assignee: 'Riya Sharma', status: 'done', dueDate: '2026-04-20', createdOn: '2026-04-12', completedOn: '2026-04-18', masterRef: null, isClientVisible: true, isVendorVisible: true, isInternalOnly: false },
      ],
      projectApprovals: [
        { id: 'ap-kv-1', title: 'Final wall paint colour — Pantone 4685C vs 4675C', typeName: 'Spec Approval', linkedStage: 'Working Drawings', linkedActivity: 'Material specs', requestedFrom: 'Karan Vij', raisedBy: 'Meher Kapoor', status: 'pending', clientFacing: 'yes', dueDate: '2026-05-07', raisedOn: '2026-05-02', decisionDate: '', decisionNotes: '', isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
        { id: 'ap-kv-2', title: 'Counter joinery mockup signoff', typeName: 'Stage Signoff', linkedStage: 'Working Drawings', linkedActivity: 'Joinery details', requestedFrom: 'Karan Vij', raisedBy: 'Riya Sharma', status: 'approved', clientFacing: 'yes', dueDate: '2026-03-15', raisedOn: '2026-03-08', decisionDate: '2026-03-14', decisionNotes: 'Approved as-is. Brass inlay finish locked.', isClientVisible: true, isVendorVisible: true, isInternalOnly: false },
      ],
      projectLevels: [
        { id: 'lv-kv-1', name: 'Ground Floor', masterRef: 8, levelType: 'Ground', levelOrder: 0, expanded: true, zones: [
          { id: 'zn-kv-1', name: 'Customer Areas', masterRef: 13, expanded: false, spaces: [
            { id: 'sp-kv-1', name: 'Seating', masterRef: 16, expanded: false, features: [] },
            { id: 'sp-kv-2', name: 'Counter', masterRef: 17, expanded: false, features: [] },
            { id: 'sp-kv-3', name: 'Order Pickup', masterRef: 18, expanded: false, features: [] },
          ]},
          { id: 'zn-kv-2', name: 'Service Areas', masterRef: 14, expanded: false, spaces: [
            { id: 'sp-kv-4', name: 'Kitchen', masterRef: 19, expanded: false, features: [] },
            { id: 'sp-kv-5', name: 'Dishwash', masterRef: 20, expanded: false, features: [] },
            { id: 'sp-kv-6', name: 'Storage', masterRef: 21, expanded: false, features: [] },
          ]},
        ]},
        { id: 'lv-kv-2', name: 'Mezzanine', masterRef: 9, levelType: 'Mezzanine', levelOrder: 1, expanded: false, zones: [
          { id: 'zn-kv-3', name: 'Back of House', masterRef: 15, expanded: false, spaces: [
            { id: 'sp-kv-7', name: 'Office', masterRef: 22, expanded: false, features: [] },
            { id: 'sp-kv-8', name: 'Staff Toilet', masterRef: 23, expanded: false, features: [] },
          ]},
        ]},
      ],
    },
  },
  {
    id: 'STD-2025-016', name: 'Lodha Park — 32A Penthouse', category: 'Home Owner', propertyType: 'Penthouse',
    siteCondition: 'Greenfield – Not Built Yet',
    serviceType: 'Design + Technical Drawing + Consultation',
    city: 'Mumbai', state: 'MH', startDate: '20 Feb 2026', expCompletion: '10 Dec 2026',
    currentStage: 'Concept', status: 'attention', progress: 18,
    pendingApprovals: 1, overdueTasks: 2, paymentDue: false,
    pm: 'Riya Sharma', pmInitials: 'RS', client: 'Vikram Saraf', accent: '#A67C5A',
    _wizard: {
      primaryClientId: 3, /* → MasterClients[3] = Vikram Saraf */
      onboardingAttentionTags: ['Decision delay risk', 'Scope unclear'],
      clientFlags: ['Slow decision maker', 'Scope unclear'],
      builtUpArea: '4800', numberOfLevels: '3',
      decisionMakers: [
        { name: 'Vikram Saraf', role: 'Owner', contact: '+91 98191 33445', email: 'vikram@sarafgrp.com', commPref: ['Email', 'Call'] },
      ],
      externalStakeholders: [],
      paymentTerms: [],
      projectTasks: [
        { id: 'tk-ld-1', title: 'Schedule layout review meeting with Vikram', description: 'Final 3 layout options ready — Vikram unresponsive for 2 weeks. Try direct call this time, not email.', linkedStage: 'Concept', linkedActivity: 'Client presentation', assigneeId: 2, assigneeName: 'Riya Sharma', assignedById: 1, assignedAt: '2026-04-08', assignee: 'Riya Sharma', status: 'todo', dueDate: '2026-04-20', createdOn: '2026-04-08', completedOn: '', masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
        { id: 'tk-ld-2', title: 'Document scope ambiguity points for client signoff', description: 'Vikram unclear on whether terrace landscaping is in or out of scope. Document 5 ambiguous areas.', linkedStage: 'Onboarding', linkedActivity: 'Scope definition', assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-04-15', assignee: 'Meher Kapoor', status: 'in_progress', dueDate: '2026-04-25', createdOn: '2026-04-15', completedOn: '', masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
      ],
      projectApprovals: [
        { id: 'ap-ld-1', title: 'Final layout option — Option A (split level) vs B (open plan)', typeName: 'Layout Approval', linkedStage: 'Concept', linkedActivity: 'Client presentation', requestedFrom: 'Vikram Saraf', raisedBy: 'Riya Sharma', status: 'pending', clientFacing: 'yes', dueDate: '2026-04-15', raisedOn: '2026-03-28', decisionDate: '', decisionNotes: '', isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
      ],
      projectLevels: [
        { id: 'lv-ld-1', name: 'Lower Level', masterRef: 5, levelType: 'Ground', levelOrder: 0, expanded: true, zones: [
          { id: 'zn-ld-1', name: 'Public Areas', masterRef: 8, expanded: false, spaces: [] },
          { id: 'zn-ld-2', name: 'Wet Areas', masterRef: 9, expanded: false, spaces: [] },
        ]},
        { id: 'lv-ld-2', name: 'Upper Level', masterRef: 6, levelType: 'Upper', levelOrder: 1, expanded: false, zones: [
          { id: 'zn-ld-3', name: 'Private Areas', masterRef: 10, expanded: false, spaces: [] },
          { id: 'zn-ld-4', name: 'Wet Areas', masterRef: 11, expanded: false, spaces: [] },
        ]},
        { id: 'lv-ld-3', name: 'Terrace', masterRef: 7, levelType: 'Roof', levelOrder: 2, expanded: false, zones: [
          { id: 'zn-ld-5', name: 'Outdoor / Terrace', masterRef: 12, expanded: false, spaces: [] },
        ]},
      ],
    },
  },
  {
    id: 'STD-2025-017', name: 'Tata Capital — Lower Parel HO', category: 'Offices', propertyType: 'Corporate HQ/HO',
    siteCondition: 'Under Construction',
    serviceType: 'Design + Technical Drawing + Consultation + Project Management',
    city: 'Mumbai', state: 'MH', startDate: '08 Mar 2026', expCompletion: '22 Jan 2027',
    currentStage: 'Onboarding', status: 'new', progress: 6,
    pendingApprovals: 2, overdueTasks: 0, paymentDue: false,
    pm: 'Meher Kapoor', pmInitials: 'MK', client: 'Tata Capital — Workplace', accent: '#1A1815',
    _wizard: {
      primaryClientId: 4, /* → MasterClients[4] = Tata Capital Ltd */
      onboardingAttentionTags: ['Multiple stakeholders', 'Measurement pending'],
      clientFlags: ['Committee approval', 'Multiple stakeholders'],
      builtUpArea: '42000', numberOfLevels: '4',
      decisionMakers: [
        { name: 'Pranav Desai', role: 'VP Workplace', contact: '+91 22 6606 1500', email: 'pranav.desai@tatacapital.com', commPref: ['Email'] },
        { name: 'Workplace Committee', role: 'Final approval body', contact: '', email: 'workplace.cmte@tatacapital.com', commPref: ['Email'] },
      ],
      externalStakeholders: [
        { vendorId: 4, projectRole: 'PMC managing project on Tata Capital behalf', projectNotes: 'All studio communication routed through C&W PM for invoicing and approvals.' },
      ],
      paymentTerms: [],
      projectTasks: [
        { id: 'tk-tc-1', title: 'Submit final concept package to Workplace Committee', description: 'Package includes: floor plans, mood boards, finishes spec, BOQ summary. Committee meets quarterly — next slot is May 10.', linkedStage: 'Concept', linkedActivity: 'Stakeholder presentation', assigneeId: 2, assigneeName: 'Riya Sharma', assignedById: 1, assignedAt: '2026-04-25', assignee: 'Riya Sharma', status: 'in_progress', dueDate: '2026-05-08', createdOn: '2026-04-25', completedOn: '', masterRef: null, remindAt: '2026-05-05', reminderChannel: 'inapp', reminderDismissed: false, isClientVisible: false, isVendorVisible: true, isInternalOnly: false },
        { id: 'tk-tc-2', title: 'Coordinate as-built drawing review with C&W', description: 'PMC needs to verify our drawings match site reality before committee presentation.', linkedStage: 'Onboarding', linkedActivity: 'Site measurement', assigneeId: 4, assigneeName: 'Devansh Iyer', assignedById: 2, assignedAt: '2026-04-22', assignee: 'Devansh Iyer', status: 'todo', dueDate: '2026-05-05', createdOn: '2026-04-22', completedOn: '', masterRef: null, isClientVisible: false, isVendorVisible: true, isInternalOnly: false },
      ],
      projectApprovals: [
        { id: 'ap-tc-1', title: 'Concept design — Workplace Committee signoff', typeName: 'Stage Signoff', linkedStage: 'Concept', linkedActivity: 'Stakeholder presentation', requestedFrom: 'Workplace Committee', raisedBy: 'Riya Sharma', status: 'pending', clientFacing: 'yes', dueDate: '2026-05-10', raisedOn: '2026-04-25', decisionDate: '', decisionNotes: '', isClientVisible: true, isVendorVisible: true, isInternalOnly: false },
        { id: 'ap-tc-2', title: 'Site measurement plan — PMC clearance', typeName: 'Process Approval', linkedStage: 'Onboarding', linkedActivity: 'Site measurement', requestedFrom: 'Pranav Desai', raisedBy: 'Devansh Iyer', status: 'pending', clientFacing: 'no', dueDate: '2026-05-04', raisedOn: '2026-04-28', decisionDate: '', decisionNotes: '', isClientVisible: false, isVendorVisible: true, isInternalOnly: false },
      ],
      projectLevels: [
        { id: 'lv-tc-1', name: 'Ground Floor', masterRef: 10, levelType: 'Ground', levelOrder: 0, expanded: true, zones: [
          { id: 'zn-tc-1', name: 'Reception & Lobby', masterRef: 16, expanded: false, spaces: [] },
          { id: 'zn-tc-2', name: 'Cafeteria', masterRef: 17, expanded: false, spaces: [] },
        ]},
        { id: 'lv-tc-2', name: '1st Floor', masterRef: 11, levelType: 'Upper', levelOrder: 1, expanded: false, zones: [
          { id: 'zn-tc-3', name: 'Workspace', masterRef: 18, expanded: false, spaces: [
            { id: 'sp-tc-1', name: 'Open Workstations', masterRef: 24, expanded: false, features: [] },
            { id: 'sp-tc-2', name: 'Phone Booths', masterRef: 25, expanded: false, features: [] },
            { id: 'sp-tc-3', name: 'Collaboration Zones', masterRef: 26, expanded: false, features: [] },
          ]},
        ]},
        { id: 'lv-tc-3', name: '2nd Floor', masterRef: 12, levelType: 'Upper', levelOrder: 2, expanded: false, zones: [
          { id: 'zn-tc-4', name: 'Meeting Rooms', masterRef: 19, expanded: false, spaces: [] },
        ]},
        { id: 'lv-tc-4', name: '3rd Floor', masterRef: 13, levelType: 'Upper', levelOrder: 3, expanded: false, zones: [
          { id: 'zn-tc-5', name: 'Cabins', masterRef: 20, expanded: false, spaces: [] },
          { id: 'zn-tc-6', name: 'Service Areas', masterRef: 21, expanded: false, spaces: [] },
        ]},
      ],
    },
  },
  {
    id: 'STD-2025-013', name: 'Hiranandani Estate — Tower B Lobby', category: 'Developer', propertyType: 'High Rise',
    siteCondition: 'Bare Shell – Completed',
    serviceType: 'Design + Technical Drawing + Consultation + Construction Administration',
    city: 'Thane', state: 'MH', startDate: '18 Nov 2025', expCompletion: '30 May 2026',
    currentStage: 'Site Execution', status: 'on-track', progress: 73,
    pendingApprovals: 0, overdueTasks: 0, paymentDue: true,
    pm: 'Devansh Iyer', pmInitials: 'DI', client: 'Hiranandani Communities', accent: '#B4593C',
    _wizard: {
      primaryClientId: 5, /* → MasterClients[5] = Hiranandani Communities */
      onboardingAttentionTags: [],
      clientFlags: ['Payment person different'],
      builtUpArea: '3200', numberOfLevels: '1',
      decisionMakers: [
        { name: 'Sanjay Hiranandani', role: 'Director', contact: '+91 22 2576 6464', email: 'sanjay@hiranandani.in', commPref: ['Email'] },
      ],
      externalStakeholders: [
        { vendorId: 5, projectRole: 'Site execution + civil', projectNotes: 'SP team on site daily; weekly progress reviews on Wednesdays.' },
      ],
      paymentTerms: [
        { id: 'pmt-hr-1', name: 'Project mobilization',  linkedStage: 'Onboarding Stage',                    percentage: '10', amount: '300000',  amountManualOverride: false, targetDate: '2026-01-15', amountReceived: 300000, receiptDate: '2026-01-12', triggerCondition: 'On signed contract',  reminderEnabled: true, reminderType: 'Email' },
        { id: 'pmt-hr-2', name: 'Site execution start',  linkedStage: 'Site Administration & Coordination',  percentage: '30', amount: '900000',  amountManualOverride: false, targetDate: '2026-03-15', amountReceived: 900000, receiptDate: '2026-03-22', triggerCondition: 'On stage start',      reminderEnabled: true, reminderType: 'Email' },
        { id: 'pmt-hr-3', name: 'Site execution 50%',    linkedStage: 'Site Supervision - Cilvil, Structure & MEP', percentage: '30', amount: '900000', amountManualOverride: false, targetDate: '2026-04-25', amountReceived: 450000, receiptDate: '2026-05-01', triggerCondition: 'On stage progress', reminderEnabled: true, reminderType: 'Email' },
        { id: 'pmt-hr-4', name: 'Snag list closure',     linkedStage: 'Site Review & DeSnag List',           percentage: '20', amount: '600000',  amountManualOverride: false, targetDate: '2026-05-12', amountReceived: 0,      receiptDate: '',           triggerCondition: 'On stage completion', reminderEnabled: true, reminderType: 'Email' },
        { id: 'pmt-hr-5', name: 'Handover',              linkedStage: 'Hand Over',                           percentage: '10', amount: '300000',  amountManualOverride: false, targetDate: '2026-06-15', amountReceived: 0,      receiptDate: '',           triggerCondition: 'On stage completion', reminderEnabled: true, reminderType: 'WhatsApp' },
      ],
      totalProjectValue: '3000000',
      projectTasks: [
        { id: 'tk-hr-1', title: 'Snag list compilation — final walkthrough', description: 'Walk lobby with Sanjay before handover. Document every paint touch-up, joinery edge, lighting alignment.', linkedStage: 'Snag List', linkedActivity: 'Site walkthrough', assigneeId: 4, assigneeName: 'Devansh Iyer', assignedById: 2, assignedAt: '2026-04-30', assignee: 'Devansh Iyer', status: 'todo', dueDate: '2026-05-18', createdOn: '2026-04-30', completedOn: '', masterRef: null, isClientVisible: true, isVendorVisible: true, isInternalOnly: false },
        { id: 'tk-hr-2', title: 'Coordinate handover documentation pack', description: 'Compile warranty cards, vendor contacts, AMC details for all installed equipment.', linkedStage: 'Handover', linkedActivity: 'Documentation', assigneeId: 2, assigneeName: 'Riya Sharma', assignedById: 1, assignedAt: '2026-05-01', assignee: 'Riya Sharma', status: 'todo', dueDate: '2026-05-25', createdOn: '2026-05-01', completedOn: '', masterRef: null, isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
      ],
      projectApprovals: [
        { id: 'ap-hr-1', title: 'Site execution stage signoff — payment release ₹18L', typeName: 'Payment Release', linkedStage: 'Site Execution', linkedActivity: 'Stage close-out', requestedFrom: 'Sanjay Hiranandani', raisedBy: 'Devansh Iyer', status: 'approved', clientFacing: 'yes', dueDate: '2026-04-25', raisedOn: '2026-04-18', decisionDate: '2026-04-22', decisionNotes: 'Approved. Payment processed via NEFT.', isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
      ],
      projectLevels: [
        { id: 'lv-hr-1', name: 'Tower B Lobby Level', masterRef: null, levelType: 'Ground', levelOrder: 0, expanded: true, zones: [
          { id: 'zn-hr-1', name: 'Public Areas', masterRef: null, expanded: false, spaces: [
            { id: 'sp-hr-1', name: 'Main Lobby', masterRef: null, expanded: false, features: [] },
            { id: 'sp-hr-2', name: 'Reception Counter', masterRef: null, expanded: false, features: [] },
            { id: 'sp-hr-3', name: 'Waiting Area', masterRef: null, expanded: false, features: [] },
          ]},
        ]},
      ],
    },
  },
  {
    id: 'STD-2025-012', name: 'Singhania Farmhouse — Alibaug', category: 'Home Owner', propertyType: 'Farm Houses',
    siteCondition: 'Styling / Furnishing Only',
    serviceType: 'Design + Technical Drawing + Consultation + Procurement',
    city: 'Alibaug', state: 'MH', startDate: '05 Oct 2025', expCompletion: '12 Apr 2026',
    currentStage: 'Procurement', status: 'on-track', progress: 64,
    pendingApprovals: 1, overdueTasks: 1, paymentDue: false,
    pm: 'Meher Kapoor', pmInitials: 'MK', client: 'Aditi Singhania', accent: '#6B7355',
    _wizard: {
      primaryClientId: 6, /* → MasterClients[6] = Aditi Singhania */
      onboardingAttentionTags: ['Site access risk'],
      clientFlags: ['High urgency'],
      builtUpArea: '3500', numberOfLevels: '2',
      decisionMakers: [
        { name: 'Aditi Singhania', role: 'Owner', contact: '+91 98203 77889', email: 'aditi@singhaniagrp.com', commPref: ['WhatsApp', 'Call'] },
      ],
      externalStakeholders: [
        { vendorId: 1, projectRole: 'Civil + finishing — Mumbai branch', projectNotes: 'Same vendor as Marwah project. Atlas knows our spec standards.' },
      ],
      paymentTerms: [
        { name: 'Procurement advance', linkedStage: 'Procurement', percentage: '50', amount: '750000', triggerCondition: 'On stage start', reminderEnabled: false, reminderType: 'WhatsApp' },
        { name: 'Final styling', linkedStage: 'Handover', percentage: '50', amount: '750000', triggerCondition: 'On stage completion', reminderEnabled: true, reminderType: 'WhatsApp' },
      ],
      projectTasks: [
        { id: 'tk-sg-1', title: 'Coordinate Alibaug ferry transport for procured pieces', description: 'Furniture batch arrives Mumbai port 14 May. Need ferry coordination to avoid 3-day land detour.', linkedStage: 'Procurement', linkedActivity: 'Logistics', assigneeId: 4, assigneeName: 'Devansh Iyer', assignedById: 3, assignedAt: '2026-05-02', assignee: 'Devansh Iyer', status: 'in_progress', dueDate: '2026-05-14', createdOn: '2026-05-02', completedOn: '', masterRef: null, isClientVisible: false, isVendorVisible: true, isInternalOnly: false },
        { id: 'tk-sg-2', title: 'Final fabric selection — drawing room sofas', description: 'Aditi reviewing 4 fabric swatches. Need decision before factory production starts.', linkedStage: 'Procurement', linkedActivity: 'Material specs', assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 1, assignedAt: '2026-05-01', assignee: 'Meher Kapoor', status: 'todo', dueDate: '2026-05-09', createdOn: '2026-05-01', completedOn: '', masterRef: null, isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
        { id: 'tk-sg-3', title: 'Site readiness check — power + plumbing for installations', description: 'Old farmhouse infra. Need electrician visit to confirm load capacity for new lighting + AC units.', linkedStage: 'Site Execution', linkedActivity: 'MEP coordination', assigneeId: 4, assigneeName: 'Devansh Iyer', assignedById: 3, assignedAt: '2026-04-20', assignee: 'Devansh Iyer', status: 'blocked', dueDate: '2026-04-30', createdOn: '2026-04-20', completedOn: '', masterRef: null, isClientVisible: false, isVendorVisible: true, isInternalOnly: false },
      ],
      projectApprovals: [
        { id: 'ap-sg-1', title: 'Drawing room sofa fabric — final selection', typeName: 'Spec Approval', linkedStage: 'Procurement', linkedActivity: 'Material specs', requestedFrom: 'Aditi Singhania', raisedBy: 'Meher Kapoor', status: 'pending', clientFacing: 'yes', dueDate: '2026-05-08', raisedOn: '2026-04-28', decisionDate: '', decisionNotes: '', isClientVisible: true, isVendorVisible: false, isInternalOnly: false },
      ],
      projectLevels: [
        { id: 'lv-sg-1', name: 'Ground Floor', masterRef: 1, levelType: 'Ground', levelOrder: 0, expanded: true, zones: [
          { id: 'zn-sg-1', name: 'Public Areas', masterRef: 1, expanded: false, spaces: [
            { id: 'sp-sg-1', name: 'Living Room', masterRef: 2, expanded: false, features: [] },
            { id: 'sp-sg-2', name: 'Dining', masterRef: 3, expanded: false, features: [] },
          ]},
          { id: 'zn-sg-2', name: 'Wet Areas', masterRef: 2, expanded: false, spaces: [
            { id: 'sp-sg-3', name: 'Kitchen', masterRef: 5, expanded: false, features: [] },
          ]},
        ]},
        { id: 'lv-sg-2', name: 'First Floor', masterRef: 2, levelType: 'Upper', levelOrder: 1, expanded: false, zones: [
          { id: 'zn-sg-3', name: 'Private Areas', masterRef: 3, expanded: false, spaces: [
            { id: 'sp-sg-4', name: 'Master Bedroom', masterRef: 6, expanded: false, features: [] },
            { id: 'sp-sg-5', name: "Children's Room", masterRef: 7, expanded: false, features: [] },
          ]},
        ]},
      ],
    },
  },
  /* ============================================================
     Phase 9.0 — Sharma Residence demo project
     Added for the Saturday studio-owner demo. Property type
     "Luxury Apartment" — uses 17 zones across 3 levels matching
     the authored MasterPropertyTypeAssemblies entry.
     Safe to delete from seed after the demo if no longer needed.
     ============================================================ */
  {
    id: 'STD-2026-001', name: 'Sharma Residence — Worli Apartment', category: 'Home Owner', propertyType: 'Luxury Apartment',
    siteCondition: 'New Construction (Bare Shell)',
    serviceType: 'Design + Build (Turnkey)',
    city: 'Mumbai', state: 'MH', startDate: '01 May 2026', expCompletion: '15 Nov 2026',
    currentStage: 'Schematic Design', status: 'on-track', progress: 18,
    pendingApprovals: 1, overdueTasks: 0, paymentDue: false,
    pm: 'Riya Sharma', pmInitials: 'RS', client: 'Rajiv & Anjali Sharma', accent: '#B4593C',
    _wizard: {
      primaryClientName: 'Rajiv Sharma',
      onboardingAttentionTags: ['High-value project', 'Tight schedule'],
      clientFlags: ['Detail-oriented', 'Premium expectations'],
      builtUpArea: '4200', numberOfLevels: '3',
      decisionMakers: [
        { name: 'Rajiv Sharma',  role: 'Primary Owner',  contact: '+91 98XXXXXXXX', email: 'rajiv.sharma@example.com',  commPref: ['Email', 'WhatsApp'] },
        { name: 'Anjali Sharma', role: 'Co-decision Maker', contact: '+91 98XXXXXXXX', email: 'anjali.sharma@example.com', commPref: ['WhatsApp'] },
      ],
      externalStakeholders: [],
      totalProjectValue: '2500000', /* Phase 9.0.21 — Demo seed: ₹25L total */
      paymentTerms: [
        { id: 'pmt-sh-1', name: 'Signing advance',          linkedStage: 'Onboarding Stage',          percentage: '20', amount: '500000',  amountManualOverride: false, targetDate: '2026-04-15', amountReceived: 500000, receiptDate: '2026-04-12', triggerCondition: 'On signed contract',     reminderEnabled: true,  reminderType: 'Email' },
        { id: 'pmt-sh-2', name: 'Concept signoff',          linkedStage: 'Concept Development Stage', percentage: '15', amount: '375000',  amountManualOverride: false, targetDate: '2026-04-30', amountReceived: 375000, receiptDate: '2026-05-02', triggerCondition: 'On client approval',     reminderEnabled: true,  reminderType: 'Email' },
        { id: 'pmt-sh-3', name: 'DD signoff',               linkedStage: 'Design Development Stage',  percentage: '20', amount: '500000',  amountManualOverride: false, targetDate: '2026-05-25', amountReceived: 200000, receiptDate: '2026-05-18', triggerCondition: 'On client approval',     reminderEnabled: true,  reminderType: 'Email' },
        { id: 'pmt-sh-4', name: 'GFC release',              linkedStage: 'GFC Drawings',              percentage: '20', amount: '500000',  amountManualOverride: false, targetDate: '2026-06-15', amountReceived: 0,      receiptDate: '',           triggerCondition: 'On stage completion',    reminderEnabled: true,  reminderType: 'Email' },
        { id: 'pmt-sh-5', name: 'Site execution start',     linkedStage: 'Site Administration & Coordination', percentage: '15', amount: '375000', amountManualOverride: false, targetDate: '2026-07-15', amountReceived: 0, receiptDate: '', triggerCondition: 'On stage start', reminderEnabled: true, reminderType: 'Email' },
        { id: 'pmt-sh-6', name: 'Final balance — Handover', linkedStage: 'Hand Over',                 percentage: '10', amount: '250000',  amountManualOverride: false, targetDate: '2026-09-30', amountReceived: 0,      receiptDate: '',           triggerCondition: 'On client approval',     reminderEnabled: true,  reminderType: 'Email' },
      ],
      projectTasks: [
        { id: 'tk-sh-1', title: 'Confirm spatial program with client',          description: '17 zones drafted from Luxury Apartment template. Walk client through and capture overrides.',                linkedStage: 'Schematic Design', linkedActivity: 'Spatial Program', assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-05-02', assignee: 'Meher Kapoor', status: 'in_progress', dueDate: '2026-05-12', createdOn: '2026-05-01', completedOn: '', masterRef: null, isClientVisible: true,  isVendorVisible: false, isInternalOnly: false },
        { id: 'tk-sh-2', title: 'Site measurement walkthrough',                  description: 'Detailed dimensions, services audit, photographs of all 3 levels.',                                            linkedStage: 'Site Survey',      linkedActivity: 'Site Measurement', assigneeId: 4, assigneeName: 'Devansh Iyer', assignedById: 2, assignedAt: '2026-05-02', assignee: 'Devansh Iyer', status: 'done',         dueDate: '2026-05-04', createdOn: '2026-05-01', completedOn: '2026-05-04', masterRef: null, isClientVisible: false, isVendorVisible: true,  isInternalOnly: false },
        { id: 'tk-sh-3', title: 'Concept presentation v1 — moodboards & narrative', description: 'Three direction options: Quiet Luxury, Indo-Modern, European Classical.',                                  linkedStage: 'Concept Design',   linkedActivity: 'Concept Direction', assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-04-20', assignee: 'Meher Kapoor', status: 'done',         dueDate: '2026-04-28', createdOn: '2026-04-18', completedOn: '2026-04-26', masterRef: null, isClientVisible: true,  isVendorVisible: false, isInternalOnly: false },
        { id: 'tk-sh-4', title: 'Master suite — schematic layout',              description: 'Layout options for master bedroom + walk-in wardrobe + master bath. 2 alternates.',                          linkedStage: 'Schematic Design', linkedActivity: 'Spatial Program', assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-05-03', assignee: 'Meher Kapoor', status: 'in_progress', dueDate: '2026-05-15', createdOn: '2026-05-03', completedOn: '', masterRef: null, isClientVisible: true,  isVendorVisible: false, isInternalOnly: false },
      ],
      projectApprovals: [
        { id: 'ap-sh-1', title: 'Concept Direction — Quiet Luxury', typeName: 'Concept Approval', linkedStage: 'Concept Design',   linkedActivity: 'Concept Direction', requestedFrom: 'Rajiv Sharma', raisedBy: 'Meher Kapoor', status: 'approved', clientFacing: 'yes', dueDate: '2026-05-02', raisedOn: '2026-04-28', decisionDate: '2026-05-01', decisionNotes: 'Quiet Luxury approved. Anjali wants slightly warmer palette.', isClientVisible: true,  isVendorVisible: false, isInternalOnly: false },
        { id: 'ap-sh-2', title: 'Schematic Layout — Living + Dining',   typeName: 'Layout Approval',  linkedStage: 'Schematic Design', linkedActivity: 'Spatial Program', requestedFrom: 'Rajiv Sharma', raisedBy: 'Meher Kapoor', status: 'pending',  clientFacing: 'yes', dueDate: '2026-05-14', raisedOn: '2026-05-08', decisionDate: '',           decisionNotes: '',                                                                          isClientVisible: true,  isVendorVisible: false, isInternalOnly: false },
      ],
      projectFiles: [
        { id: 'fl-sh-1', name: 'Site Survey — Sharma Residence — All Levels.pdf',      type: 'pdf', size: '4.2 MB', tag: 'site survey',            stage: 'Site Survey',      uploadedBy: 'Devansh Iyer', uploadedOn: '2026-05-04', clientApproved: false, vendorAcknowledged: false, approvalStatus: '' },
        { id: 'fl-sh-2', name: 'Concept Presentation v1 — 3 Directions.pdf',           type: 'pdf', size: '12.6 MB', tag: 'concept presentation',  stage: 'Concept Design',   uploadedBy: 'Meher Kapoor', uploadedOn: '2026-04-26', clientApproved: true,  vendorAcknowledged: false, approvalStatus: 'approved' },
        { id: 'fl-sh-3', name: 'Mood Board — Quiet Luxury (Approved).jpg',             type: 'image', size: '2.1 MB', tag: 'moodboard',             stage: 'Concept Design',   uploadedBy: 'Meher Kapoor', uploadedOn: '2026-04-30', clientApproved: true,  vendorAcknowledged: false, approvalStatus: 'approved' },
        { id: 'fl-sh-4', name: 'Schematic — Living & Dining Layout v2.dwg',            type: 'dwg', size: '880 KB',  tag: 'schematic drawing',     stage: 'Schematic Design', uploadedBy: 'Meher Kapoor', uploadedOn: '2026-05-08', clientApproved: false, vendorAcknowledged: false, approvalStatus: 'pending', sentForApproval: true },
        { id: 'fl-sh-5', name: 'Schematic — Master Suite Layout — 2 Alternates.pdf',  type: 'pdf', size: '3.4 MB',  tag: 'schematic drawing',     stage: 'Schematic Design', uploadedBy: 'Meher Kapoor', uploadedOn: '2026-05-09', clientApproved: false, vendorAcknowledged: false, approvalStatus: '' },
      ],
      comms: [
        { id: 'cm-sh-1', channel: 'WhatsApp', from: 'Rajiv Sharma', to: 'Meher Kapoor', subject: 'Liked the Quiet Luxury direction', preview: 'Hi Meher, both Anjali and I felt strongly about Quiet Luxury. Slightly warmer palette would be even better — less cold whites, more taupe/cream...', date: '2026-05-01', stage: 'Concept Design', isPinned: true,  attachments: [] },
        { id: 'cm-sh-2', channel: 'Email',    from: 'Meher Kapoor', to: 'Rajiv Sharma', subject: 'Schematic layouts ready for review',  preview: 'Hi Rajiv, attaching the v2 schematic for Living & Dining + 2 alternates for Master Suite. Would love your feedback by Wed if possible...',           date: '2026-05-08', stage: 'Schematic Design', isPinned: false, attachments: ['fl-sh-4', 'fl-sh-5'] },
        { id: 'cm-sh-3', channel: 'WhatsApp', from: 'Anjali Sharma', to: 'Meher Kapoor', subject: 'One question about the master suite', preview: 'Hi Meher, in the second alternate, can the walk-in wardrobe open from both sides? My morning routine and Rajivs differ a lot...',                date: '2026-05-09', stage: 'Schematic Design', isPinned: false, attachments: [] },
      ],
      siteUpdates: [
        { id: 'su-sh-1', date: '2026-05-04', title: 'Initial site survey completed',     description: 'Full dimensional survey across all 3 levels. Photographed every room. MEP audit attached.', author: 'Devansh Iyer', stage: 'Site Survey' },
      ],
      moms: [
        { id: 'mo-sh-1', date: '2026-04-26', title: 'Concept Presentation Meeting',         attendees: 'Rajiv Sharma, Anjali Sharma, Meher Kapoor',  decisions: 'Quiet Luxury approved with slightly warmer palette. Indo-Modern dropped. European Classical to be reconsidered for the formal living only.', stage: 'Concept Design' },
        { id: 'mo-sh-2', date: '2026-05-04', title: 'Site Walkthrough — Final Measurements', attendees: 'Devansh Iyer, Rajiv Sharma',                  decisions: 'Confirmed slab levels, structural columns located, services entry points marked. Two changes from architect drawings noted.', stage: 'Site Survey' },
      ],
      /* projectLevels — mirrors the structure of an authored Luxury Apartment assembly.
         Real data so the Schematic stage in the Project Journey tab shows actual content. */
      projectLevels: [
        { id: 'lv-sh-1', name: 'Main Level', masterRef: null, levelType: 'Ground Floor', levelOrder: 0, expanded: true, zones: [
          { id: 'zn-sh-1',  name: 'Arrival & Transition Zone',            masterRef: 1,  expanded: false, spaces: [
            { id: 'sp-sh-1',  name: 'Entrance Foyer',     masterRef: 1,  expanded: false, features: [] },
            { id: 'sp-sh-2',  name: 'Welcome Lounge',     masterRef: 3,  expanded: false, features: [] },
            { id: 'sp-sh-3',  name: 'Shoe & Cloak Area',  masterRef: 5,  expanded: false, features: [] },
          ]},
          { id: 'zn-sh-2',  name: 'Formal Living & Entertaining Zone',    masterRef: 2,  expanded: false, spaces: [
            { id: 'sp-sh-4',  name: 'Formal Living Room', masterRef: 7,  expanded: false, features: [] },
            { id: 'sp-sh-5',  name: 'Bar Lounge',         masterRef: 12, expanded: false, features: [] },
            { id: 'sp-sh-6',  name: 'Conversation Lounge', masterRef: 10, expanded: false, features: [] },
          ]},
          { id: 'zn-sh-3',  name: 'Informal Family Living Zone',          masterRef: 3,  expanded: false, spaces: [
            { id: 'sp-sh-7',  name: 'Family Living Room', masterRef: 14, expanded: false, features: [] },
            { id: 'sp-sh-8',  name: 'TV Lounge',          masterRef: 15, expanded: false, features: [] },
            { id: 'sp-sh-9',  name: 'Reading Corner',     masterRef: 16, expanded: false, features: [] },
          ]},
          { id: 'zn-sh-4',  name: 'Dining & Hosting Zone',                masterRef: 4,  expanded: false, spaces: [
            { id: 'sp-sh-10', name: 'Formal Dining Room', masterRef: 18, expanded: false, features: [] },
            { id: 'sp-sh-11', name: 'Breakfast Nook',     masterRef: 20, expanded: false, features: [] },
          ]},
          { id: 'zn-sh-5',  name: 'Kitchen, Utility & Service Zone',      masterRef: 5,  expanded: false, spaces: [
            { id: 'sp-sh-12', name: 'Main Kitchen',       masterRef: 23, expanded: false, features: [] },
            { id: 'sp-sh-13', name: 'Show Kitchen',       masterRef: 24, expanded: false, features: [] },
            { id: 'sp-sh-14', name: 'Pantry',             masterRef: 27, expanded: false, features: [] },
            { id: 'sp-sh-15', name: 'Utility Room',       masterRef: 28, expanded: false, features: [] },
            { id: 'sp-sh-16', name: 'Staff Pantry',       masterRef: 31, expanded: false, features: [] },
          ]},
          { id: 'zn-sh-6',  name: 'Guest Hospitality Zone',               masterRef: 9,  expanded: false, spaces: [
            { id: 'sp-sh-17', name: 'Guest Bedroom',      masterRef: 49, expanded: false, features: [] },
            { id: 'sp-sh-18', name: 'Guest Bathroom',     masterRef: 52, expanded: false, features: [] },
          ]},
          { id: 'zn-sh-7',  name: 'Powder & Guest Grooming',              masterRef: 12, expanded: false, displayLabel: 'Powder & Guest Grooming', spaces: [
            { id: 'sp-sh-19', name: 'Powder Room',        masterRef: 68, expanded: false, features: [] },
          ]},
        ]},
        { id: 'lv-sh-2', name: 'Upper Level', masterRef: null, levelType: 'First Floor', levelOrder: 1, expanded: false, zones: [
          { id: 'zn-sh-8',  name: 'Master Suite & Personal Retreat Zone', masterRef: 7,  expanded: false, spaces: [
            { id: 'sp-sh-20', name: 'Master Bedroom',     masterRef: 38, expanded: false, features: [] },
            { id: 'sp-sh-21', name: 'Walk-in Wardrobe',   masterRef: 40, expanded: false, features: [] },
            { id: 'sp-sh-22', name: 'Master Bathroom',    masterRef: 42, expanded: false, features: [] },
            { id: 'sp-sh-23', name: 'Private Lounge',     masterRef: 39, expanded: false, features: [] },
            { id: 'sp-sh-24', name: 'Private Balcony',    masterRef: 43, expanded: false, features: [] },
          ]},
          { id: 'zn-sh-9',  name: 'Private Family Bedroom Zone',          masterRef: 6,  expanded: false, spaces: [
            { id: 'sp-sh-25', name: "Children's Bedroom", masterRef: 34, expanded: false, features: [] },
            { id: 'sp-sh-26', name: 'Teenager Bedroom',   masterRef: 35, expanded: false, features: [] },
          ]},
          { id: 'zn-sh-10', name: "Children's Learning & Lifestyle Zone", masterRef: 8,  expanded: false, spaces: [
            { id: 'sp-sh-27', name: 'Study Room',         masterRef: 45, expanded: false, features: [] },
            { id: 'sp-sh-28', name: 'Play Room',          masterRef: 46, expanded: false, features: [] },
          ]},
          { id: 'zn-sh-11', name: 'Wellness, Leisure & Recreation Zone',  masterRef: 11, expanded: false, spaces: [
            { id: 'sp-sh-29', name: 'Home Theatre',       masterRef: 63, expanded: false, features: [] },
            { id: 'sp-sh-30', name: 'Home Gym',           masterRef: 58, expanded: false, features: [] },
            { id: 'sp-sh-31', name: 'Yoga Room',          masterRef: 59, expanded: false, features: [] },
          ]},
        ]},
        { id: 'lv-sh-3', name: 'Terrace', masterRef: null, levelType: 'Roof / Terrace', levelOrder: 2, expanded: false, zones: [
          { id: 'zn-sh-12', name: 'Balcony, Deck & Outdoor Living Zone',  masterRef: 13, expanded: false, spaces: [
            { id: 'sp-sh-32', name: 'Sky Deck',           masterRef: 71, expanded: false, features: [] },
            { id: 'sp-sh-33', name: 'Outdoor Seating',    masterRef: 73, expanded: false, features: [] },
            { id: 'sp-sh-34', name: 'Green Balcony',      masterRef: 74, expanded: false, features: [] },
          ]},
        ]},
      ],
    },
  },

  /* ============================================================
     Project 9 — SitaMari Jha (added v0.18.29)
     Lean seed for Files-tab redesign demo. Onboarding stage,
     Luxury Apartment in Patna, real file data so the redesigned
     Files page has content to render.
     ============================================================ */
  {
    id: 'STD-2026-891', name: 'SitaMari Jha', category: 'Home Owner', propertyType: 'Luxury Apartment',
    propertyCategory: 'Home Owner',
    client: 'SitaMari Jha',
    siteCondition: 'Bare Shell – Completed',
    serviceType: 'Design + Construction Administration',
    city: 'Patna', state: 'Bihar', startDate: '15 Mar 2026', expCompletion: '29 Aug 2026',
    currentStage: 'Onboarding Stage', status: 'attention', progress: 3,
    pendingApprovals: 0, overdueTasks: 1, paymentDue: true,
    accent: '#B85C1F', icon: 'Home',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&auto=format&fit=crop',
    _wizard: {
      clientProjectName: 'SitaMari Jha',
      projectId: 'STD-2026-891',
      projectCategory: 'Home Owner',
      propertyType: 'Luxury Apartment',
      siteAddress: 'Boring Road, Patna',
      city: 'Patna',
      state: 'Bihar',
      pinCode: '40050',
      siteCondition: 'Bare Shell – Completed',
      siteSize: 'Large',
      serviceType: 'Design + Construction Administration',
      includedScope: 'Full interior design, custom joinery, lighting design, soft furnishings, art curation, end-to-end procurement and execution.',
      excludedScope: 'Civil structural changes, exterior landscaping, smart home integration, swimming pool design.',
      procurementResponsibility: 'Client',
      executionResponsibility: 'Contractor',
      builtUpArea: '3200',
      carpetArea: '2680',
      ceilingHeight: '11',
      numberOfLevels: '1',
      numberOfFloors: '1',
      levelNames: 'Apartment',
      projWorkflowstage: 'Onboarding Stage',
      siteMeasurementStatus: 'Pending',
      liftAvailability: 'Yes', parkingAvailability: 'Yes', serviceEntryAvailability: 'Limited',
      structuralConstraints: 'Two load-bearing walls between living and master bedroom — cannot be removed.',
      startDate: '2026-03-15', expCompletion: '2026-08-29',
      totalProjectValue: '50000000',
      paymentTerms: [
        { id: 'pt-jh-1', stage: 'Onboarding', percent: 5, dueDate: '2026-03-20', amount: 250000, billedAmount: 250000, billedAt: '2026-03-22', invoiceNumber: 'INV-JH-001', receivedAmount: 200000, receivedAt: '2026-03-25', status: 'received_partial' },
        { id: 'pt-jh-2', stage: 'Concept Design', percent: 15, dueDate: '2026-04-15', amount: 750000, billedAmount: 0, billedAt: '', invoiceNumber: '', receivedAmount: 0, receivedAt: '', status: 'pending' },
        { id: 'pt-jh-3', stage: 'Schematic Design', percent: 25, dueDate: '2026-05-29', amount: 1250000, billedAmount: 0, billedAt: '', invoiceNumber: '', receivedAmount: 0, receivedAt: '', status: 'pending' },
      ],
      decisionMakers: [
        { id: 'dm-jh-1', name: 'SitaMari Jha', role: 'Owner · Primary', email: 'sita@example.com', phone: '+91 98765 12345', isPrimary: true },
        { id: 'dm-jh-2', name: 'Vikash Jha', role: 'Spouse · Secondary', email: 'vikash@example.com', phone: '+91 98765 12346', isPrimary: false },
      ],
      projectTeamMemberIds: [3, 4, 6],
      projectManagerId: '3',
      projectTasks: [
        { id: 'tk-jh-1',  title: 'Schedule kickoff with SitaMari',  description: 'Set up initial briefing call.', linkedStage: 'Onboarding Stage', linkedActivity: 'Kickoff & Alignment', assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-03-15', startDate: '2026-03-15', assignee: 'Meher Kapoor', status: 'todo', dueDate: '2026-03-22', createdOn: '2026-03-15', completedOn: '', masterRef: null, isClientVisible: true,  isVendorVisible: false, isInternalOnly: false },
        { id: 'tk-jh-2',  title: 'Capture initial brief',           description: 'Document family lifestyle, aesthetic references, budget envelope.', linkedStage: 'Onboarding Stage', linkedActivity: 'Initial Client Brief Meeting', assigneeId: 4, assigneeName: 'Devansh Iyer', assignedById: 2, assignedAt: '2026-03-22', startDate: '2026-03-22', assignee: 'Devansh Iyer', status: 'in_progress', dueDate: '2026-05-09', createdOn: '2026-03-22', completedOn: '', masterRef: null, isClientVisible: true,  isVendorVisible: false, isInternalOnly: false },
        { id: 'tk-jh-3',  title: 'Site survey with measurements',   description: 'Full apartment measurement + photos.', linkedStage: 'Onboarding Stage', linkedActivity: 'Site Information Collection', assigneeId: 4, assigneeName: 'Devansh Iyer', assignedById: 2, assignedAt: '2026-04-02', startDate: '2026-04-02', assignee: 'Devansh Iyer', status: 'todo', dueDate: '2026-04-12', createdOn: '2026-04-02', completedOn: '', masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
        { id: 'tk-jh-4',  title: 'Sign engagement contract',        description: 'Finalize commercials and execution responsibility.', linkedStage: 'Onboarding Stage', linkedActivity: 'Scope & Commercial Alignment', assigneeId: 6, assigneeName: 'Aanya Sharma', assignedById: 2, assignedAt: '2026-03-18', startDate: '2026-03-18', assignee: 'Aanya Sharma', status: 'done', dueDate: '2026-03-22', createdOn: '2026-03-18', completedOn: '2026-03-21', masterRef: null, isClientVisible: true,  isVendorVisible: false, isInternalOnly: false },
        { id: 'tk-jh-5',  title: 'Set up project portal',           description: 'Drive folder + Slack channel + portal access.', linkedStage: 'Onboarding Stage', linkedActivity: 'Team & Workflow Setup', assigneeId: 3, assigneeName: 'Meher Kapoor', assignedById: 2, assignedAt: '2026-03-20', startDate: '2026-03-20', assignee: 'Meher Kapoor', status: 'done', dueDate: '2026-03-24', createdOn: '2026-03-20', completedOn: '2026-03-23', masterRef: null, isClientVisible: false, isVendorVisible: false, isInternalOnly: true },
      ],
      projectApprovals: [
        { id: 'ap-jh-1', title: 'Engagement contract — signed copy', typeName: 'Contract Approval', linkedStage: 'Onboarding Stage', linkedActivity: 'Scope & Commercial Alignment', requestedFrom: 'SitaMari Jha', raisedBy: 'Aanya Sharma', status: 'approved', clientFacing: 'yes', dueDate: '2026-03-22', raisedOn: '2026-03-19', decisionDate: '2026-03-21', decisionNotes: 'Signed in person at Patna office.', isClientVisible: true,  isVendorVisible: false, isInternalOnly: false },
      ],
      projectFiles: [
        /* === Phase 9.1.29 — Rich file seed for Files redesign demo ===
           Mix of file types: PDFs, drawings, images, spreadsheets. Tagged
           per stage and activity so grouping and filtering have texture. */
        { id: 'fl-jh-1',  name: 'Engagement Contract — SitaMari Jha — Signed.pdf',  type: 'pdf',   size: '1.4 MB', tag: 'contract',          stage: 'Onboarding Stage', linkedActivity: 'Scope & Commercial Alignment', uploadedBy: 'Aanya Sharma',  uploadedOn: '2026-03-21', clientApproved: true,  vendorAcknowledged: false, approvalStatus: 'approved' },
        { id: 'fl-jh-2',  name: 'Initial Client Brief — Captured Inputs.pdf',       type: 'pdf',   size: '2.8 MB', tag: 'client brief',      stage: 'Onboarding Stage', linkedActivity: 'Initial Client Brief Meeting', uploadedBy: 'Meher Kapoor', uploadedOn: '2026-03-25', clientApproved: true,  vendorAcknowledged: false, approvalStatus: 'approved' },
        { id: 'fl-jh-3',  name: 'Stakeholder Kickoff — Agenda + Minutes.pdf',       type: 'pdf',   size: '410 KB', tag: 'meeting minutes',   stage: 'Onboarding Stage', linkedActivity: 'Kickoff & Alignment', uploadedBy: 'Meher Kapoor', uploadedOn: '2026-03-26', clientApproved: false, vendorAcknowledged: false, approvalStatus: '' },
        { id: 'fl-jh-4',  name: 'Existing Floor Plan — Builder Issued.pdf',         type: 'pdf',   size: '3.6 MB', tag: 'reference drawing', stage: 'Onboarding Stage', linkedActivity: 'Site Information Collection', uploadedBy: 'Devansh Iyer', uploadedOn: '2026-03-28', clientApproved: false, vendorAcknowledged: false, approvalStatus: '' },
        { id: 'fl-jh-5',  name: 'Society NOC + Working Hours Note.pdf',             type: 'pdf',   size: '720 KB', tag: 'site documentation',stage: 'Onboarding Stage', linkedActivity: 'Site Information Collection', uploadedBy: 'Devansh Iyer', uploadedOn: '2026-03-29', clientApproved: false, vendorAcknowledged: false, approvalStatus: '' },
        { id: 'fl-jh-6',  name: 'Site Photographs — All Rooms (62 images).zip',     type: 'image', size: '184 MB',tag: 'site photographs',  stage: 'Onboarding Stage', linkedActivity: 'Site Information Collection', uploadedBy: 'Devansh Iyer', uploadedOn: '2026-04-02', clientApproved: false, vendorAcknowledged: false, approvalStatus: '' },
        { id: 'fl-jh-7',  name: 'Site Measurement — Apartment Plan.dwg',             type: 'dwg',   size: '1.2 MB', tag: 'measurement drawing',stage: 'Onboarding Stage', linkedActivity: 'Site Information Collection', uploadedBy: 'Devansh Iyer', uploadedOn: '2026-04-08', clientApproved: false, vendorAcknowledged: false, approvalStatus: '' },
        { id: 'fl-jh-8',  name: 'Reference Mood — Living Room (Pinterest set).jpg', type: 'image', size: '6.4 MB', tag: 'mood reference',    stage: 'Onboarding Stage', linkedActivity: 'Initial Client Brief Meeting', uploadedBy: 'Meher Kapoor', uploadedOn: '2026-03-25', clientApproved: false, vendorAcknowledged: false, approvalStatus: '' },
        { id: 'fl-jh-9',  name: 'Reference Mood — Master Bedroom.jpg',              type: 'image', size: '4.8 MB', tag: 'mood reference',    stage: 'Onboarding Stage', linkedActivity: 'Initial Client Brief Meeting', uploadedBy: 'Meher Kapoor', uploadedOn: '2026-03-25', clientApproved: false, vendorAcknowledged: false, approvalStatus: '' },
        { id: 'fl-jh-10', name: 'Indicative BOQ — Onboarding Phase v1.xlsx',         type: 'xlsx',  size: '88 KB',  tag: 'cost estimate',     stage: 'Onboarding Stage', linkedActivity: 'Scope & Commercial Alignment', uploadedBy: 'Aanya Sharma',  uploadedOn: '2026-03-19', clientApproved: false, vendorAcknowledged: false, approvalStatus: '' },
        { id: 'fl-jh-11', name: 'Project Folder Structure — Drive Index.pdf',        type: 'pdf',   size: '120 KB', tag: 'project setup',     stage: 'Onboarding Stage', linkedActivity: 'Team & Workflow Setup', uploadedBy: 'Meher Kapoor', uploadedOn: '2026-03-23', clientApproved: false, vendorAcknowledged: false, approvalStatus: '' },
        { id: 'fl-jh-12', name: 'Concept Mood — 3 Direction Boards (preview).pdf',   type: 'pdf',   size: '14.2 MB',tag: 'concept presentation', stage: 'Concept Stage', linkedActivity: 'Mood Board Creation', uploadedBy: 'Meher Kapoor', uploadedOn: '2026-04-30', clientApproved: false, vendorAcknowledged: false, approvalStatus: 'pending', sentForApproval: true },
      ],
      comms: [
        { id: 'cm-jh-1', channel: 'Email', from: 'SitaMari Jha', to: 'Aanya Sharma', subject: 'Confirming engagement scope', preview: 'Aanya, the contract looks fine. Sending it back signed today...', date: '2026-03-21', stage: 'Onboarding Stage', isPinned: true, attachments: ['fl-jh-1'] },
      ],
      /* Phase 9.1.36 — Full Luxury Apartment spatial cascade. Mirrors the
         MasterLevels/Zones/Spaces/Features/Elements seed for Luxury Apartment
         from v0.18.35. masterRef preserved so "Fetch from Master" can reconcile,
         and the user can demo the Plan Property tab end-to-end out of the box. */
      projectLevels: [
        {
          id: 'lv-sita-1', name: 'Main Floor', masterRef: 15, expanded: true, zones: [
            { id: 'zn-sita-1', name: 'Arrival & Foyer', masterRef: 25, expanded: true, spaces: [
              { id: 'sp-sita-1', name: 'Entry Lobby', masterRef: 27, expanded: false, features: [] },
              { id: 'sp-sita-2', name: 'Shoe & Coat Niche', masterRef: 28, expanded: false, features: [] },
              { id: 'sp-sita-3', name: 'Display / Console Wall', masterRef: 29, expanded: false, features: [] },
            ]},
            { id: 'zn-sita-2', name: 'Living & Entertaining', masterRef: 26, expanded: true, spaces: [
              { id: 'sp-sita-4', name: 'Main Living Room', masterRef: 30, expanded: true, features: [
                { id: 'ft-sita-1', name: 'Flooring', masterRef: 24, expanded: false, elements: [
                  { id: 'el-sita-1', name: 'Italian Marble Slab', masterRef: 20, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                  { id: 'el-sita-2', name: 'Engineered Oak Plank', masterRef: 21, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                ]},
                { id: 'ft-sita-2', name: 'Wall Treatment', masterRef: 25, expanded: false, elements: [
                  { id: 'el-sita-3', name: 'Veneer Panelling', masterRef: 23, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                  { id: 'el-sita-4', name: 'Fluted Wood', masterRef: 24, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                ]},
                { id: 'ft-sita-3', name: 'False Ceiling', masterRef: 26, expanded: false, elements: [
                  { id: 'el-sita-5', name: 'POP Box with Cove', masterRef: 28, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                ]},
                { id: 'ft-sita-4', name: 'Lighting', masterRef: 27, expanded: false, elements: [
                  { id: 'el-sita-6', name: 'Designer Chandelier', masterRef: 31, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                  { id: 'el-sita-7', name: 'Cove Lighting (LED Strip)', masterRef: 32, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                  { id: 'el-sita-8', name: 'Recessed Spotlights', masterRef: 33, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                  { id: 'el-sita-9', name: 'Wall Sconces', masterRef: 34, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                ]},
                { id: 'ft-sita-5', name: 'Sofa & Seating', masterRef: 29, expanded: false, elements: [
                  { id: 'el-sita-10', name: 'L-Shaped Sofa', masterRef: 38, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                  { id: 'el-sita-11', name: 'Accent Chairs', masterRef: 39, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                  { id: 'el-sita-12', name: 'Ottomans', masterRef: 40, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                ]},
                { id: 'ft-sita-6', name: 'Media / TV Joinery', masterRef: 30, expanded: false, elements: [
                  { id: 'el-sita-13', name: 'TV Unit (Wall-mounted)', masterRef: 42, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                  { id: 'el-sita-14', name: 'Display Shelving', masterRef: 43, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                ]},
              ]},
              { id: 'sp-sita-5', name: 'Bar Counter', masterRef: 32, expanded: false, features: [] },
              { id: 'sp-sita-6', name: 'Media / TV Wall', masterRef: 33, expanded: false, features: [] },
            ]},
            { id: 'zn-sita-3', name: 'Dining', masterRef: 27, expanded: true, spaces: [
              { id: 'sp-sita-7', name: 'Formal Dining', masterRef: 35, expanded: false, features: [
                { id: 'ft-sita-7', name: 'Dining Table', masterRef: 39, expanded: false, elements: [] },
                { id: 'ft-sita-8', name: 'Dining Chairs', masterRef: 40, expanded: false, elements: [] },
                { id: 'ft-sita-9', name: 'Chandelier', masterRef: 42, expanded: false, elements: [] },
              ]},
              { id: 'sp-sita-8', name: 'Breakfast Counter', masterRef: 36, expanded: false, features: [] },
            ]},
            { id: 'zn-sita-4', name: 'Kitchen & Pantry', masterRef: 28, expanded: true, spaces: [
              { id: 'sp-sita-9', name: 'Main Kitchen', masterRef: 38, expanded: true, features: [
                { id: 'ft-sita-10', name: 'Cabinetry', masterRef: 45, expanded: false, elements: [
                  { id: 'el-sita-15', name: 'Base Cabinets', masterRef: 46, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                  { id: 'el-sita-16', name: 'Wall Cabinets', masterRef: 47, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                  { id: 'el-sita-17', name: 'Tall Pantry Units', masterRef: 48, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                ]},
                { id: 'ft-sita-11', name: 'Countertop', masterRef: 46, expanded: false, elements: [
                  { id: 'el-sita-18', name: 'Quartz (Caesarstone)', masterRef: 52, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                ]},
                { id: 'ft-sita-12', name: 'Appliances', masterRef: 48, expanded: false, elements: [
                  { id: 'el-sita-19', name: 'Built-in Oven', masterRef: 55, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                  { id: 'el-sita-20', name: 'Dishwasher', masterRef: 57, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                  { id: 'el-sita-21', name: 'Chimney / Hood', masterRef: 61, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                ]},
              ]},
              { id: 'sp-sita-10', name: 'Walk-in Pantry', masterRef: 40, expanded: false, features: [] },
            ]},
            { id: 'zn-sita-5', name: 'Master Suite', masterRef: 29, expanded: true, spaces: [
              { id: 'sp-sita-11', name: 'Master Bedroom', masterRef: 42, expanded: true, features: [
                { id: 'ft-sita-13', name: 'Bed & Headboard', masterRef: 56, expanded: false, elements: [
                  { id: 'el-sita-22', name: 'King Bed (Upholstered Headboard)', masterRef: 66, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                ]},
                { id: 'ft-sita-14', name: 'Lighting', masterRef: 58, expanded: false, elements: [
                  { id: 'el-sita-23', name: 'Bedside Pendant Lights', masterRef: 70, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                  { id: 'el-sita-24', name: 'Cove Lighting', masterRef: 73, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                ]},
              ]},
              { id: 'sp-sita-12', name: 'Master Walk-in Wardrobe', masterRef: 43, expanded: false, features: [
                { id: 'ft-sita-15', name: 'Wardrobe Shutters', masterRef: 63, expanded: false, elements: [
                  { id: 'el-sita-25', name: 'Veneer Shutter', masterRef: 74, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                  { id: 'el-sita-26', name: 'Mirror Shutter', masterRef: 75, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                ]},
              ]},
              { id: 'sp-sita-13', name: 'Master Bathroom', masterRef: 44, expanded: false, features: [
                { id: 'ft-sita-16', name: 'Sanitary Ware', masterRef: 72, expanded: false, elements: [
                  { id: 'el-sita-27', name: 'Wall-hung WC', masterRef: 86, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                  { id: 'el-sita-28', name: 'Rain Shower Head', masterRef: 90, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                ]},
                { id: 'ft-sita-17', name: 'Shower Enclosure', masterRef: 73, expanded: false, elements: [
                  { id: 'el-sita-29', name: 'Frameless Glass Cubicle', masterRef: 92, specs: [], checklists: [], drawings: [], references: [], boqItems: [] },
                ]},
              ]},
            ]},
            { id: 'zn-sita-6', name: 'Family Bedrooms', masterRef: 30, expanded: true, spaces: [
              { id: 'sp-sita-14', name: "Daughter's Bedroom", masterRef: 47, expanded: false, features: [] },
              { id: 'sp-sita-15', name: "Son's Bedroom", masterRef: 48, expanded: false, features: [] },
              { id: 'sp-sita-16', name: 'Family Bathroom', masterRef: 49, expanded: false, features: [] },
            ]},
            { id: 'zn-sita-7', name: 'Guest Suite', masterRef: 31, expanded: true, spaces: [
              { id: 'sp-sita-17', name: 'Guest Bedroom', masterRef: 51, expanded: false, features: [] },
              { id: 'sp-sita-18', name: 'Guest Bathroom', masterRef: 52, expanded: false, features: [] },
            ]},
            { id: 'zn-sita-8', name: 'Study / Home Office', masterRef: 32, expanded: true, spaces: [
              { id: 'sp-sita-19', name: 'Home Office', masterRef: 54, expanded: false, features: [] },
              { id: 'sp-sita-20', name: 'Pooja / Meditation Corner', masterRef: 56, expanded: false, features: [] },
            ]},
            { id: 'zn-sita-9', name: 'Powder & Common Bath', masterRef: 33, expanded: true, spaces: [
              { id: 'sp-sita-21', name: 'Powder Room', masterRef: 57, expanded: false, features: [] },
            ]},
            { id: 'zn-sita-10', name: 'Service & Utility', masterRef: 34, expanded: true, spaces: [
              { id: 'sp-sita-22', name: 'Servant Quarter', masterRef: 59, expanded: false, features: [] },
              { id: 'sp-sita-23', name: 'Staff Toilet', masterRef: 60, expanded: false, features: [] },
              { id: 'sp-sita-24', name: 'Store Room', masterRef: 61, expanded: false, features: [] },
            ]},
            { id: 'zn-sita-11', name: 'Balconies & Decks', masterRef: 35, expanded: true, spaces: [
              { id: 'sp-sita-25', name: 'Living Balcony', masterRef: 64, expanded: false, features: [] },
              { id: 'sp-sita-26', name: 'Master Bedroom Balcony', masterRef: 65, expanded: false, features: [] },
            ]},
          ]
        },
        {
          id: 'lv-sita-2', name: 'Private Terrace', masterRef: 16, expanded: true, zones: [
            { id: 'zn-sita-12', name: 'Outdoor Lounge', masterRef: 36, expanded: true, spaces: [
              { id: 'sp-sita-27', name: 'Outdoor Seating', masterRef: 67, expanded: false, features: [] },
              { id: 'sp-sita-28', name: 'Outdoor Dining', masterRef: 68, expanded: false, features: [] },
              { id: 'sp-sita-29', name: 'Jacuzzi / Plunge Pool', masterRef: 70, expanded: false, features: [] },
            ]},
            { id: 'zn-sita-13', name: 'Landscape & Garden', masterRef: 37, expanded: true, spaces: [
              { id: 'sp-sita-30', name: 'Planters & Greens', masterRef: 71, expanded: false, features: [] },
              { id: 'sp-sita-31', name: 'Water Feature', masterRef: 72, expanded: false, features: [] },
              { id: 'sp-sita-32', name: 'Pergola / Trellis', masterRef: 73, expanded: false, features: [] },
            ]},
          ]
        },
      ],
      siteUpdates: [],
      moms: [],
    },
  },
];
