// In-memory data store with realistic seed data for WSC First Edition
import { 
  WSCEvent, 
  Team, 
  Match, 
  Participant, 
  RaceCategory, 
  RaceResult, 
  Payment, 
  MediaAsset, 
  Announcement, 
  AuditLog,
  CaptainAccount,
  TeamPlayer
} from "@/types";

// Seed Events with Dynamic Tournament Parameters
export const seedEvents: WSCEvent[] = [
  {
    id: "e-football-001",
    categoryId: "football",
    title: "Winners Football Competition (WFC)",
    slug: "wfc-first-edition",
    edition: "First Edition",
    hostInstitution: "Southern Delta University, Ozoro",
    venue: "SDU Main Sports Complex (Pitch 1 & 2)",
    description: "The premier 5-a-side Monkey Post football tournament at Southern Delta University, Ozoro. 16 student teams competing in a high-intensity single-elimination knockout tournament for ₦80,000 in total prize money.",
    status: "registration_open",
    startDate: "2026-11-20",
    endDate: "2026-12-05",
    registrationDeadline: "2026-11-18T23:59:59Z",
    registrationFee: 10000,
    maxParticipants: 16,
    
    // Dynamic Tournament Parameters (Editable via Admin)
    maxTeams: 16,
    squadSize: 7,
    playersOnPitch: 5,
    prizePoolTotal: 80000,
    prizeFirst: 50000,
    prizeSecond: 20000,
    prizeThird: 10000,
    halfDurationMinutes: 20,
    extraTimeMinutes: 5,
    gracePeriodMinutes: 15,
    yellowCardFine: 1000,
    redCardFine: 3000,

    rulesSummary: "Monkey Post format with small goalposts. 7 registered players per team; 5 move freely on pitch; no fixed goalkeeper or post defender. 20 mins per half. 15-min walkover grace period. Yellow card fine ₦1,000; Red card fine ₦3,000 + 1 match suspension. Designated phone video review.",
    bannerUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
    contactEmail: "football@winners-sports.org",
    contactPhone: "+234 803 123 4567",
    confirmedCount: 16,
  },
  {
    id: "e-marathon-002",
    categoryId: "marathon",
    title: "Winners Marathon Challenge (WMC)",
    slug: "wmc-first-edition",
    edition: "First Edition",
    hostInstitution: "Southern Delta University, Ozoro",
    venue: "SDU University Ring Road & Sports Complex",
    description: "Campus-wide endurance road running competition celebrating student fitness, determination and fair play. Features a competitive 10K Campus Elite division and a 5K Campus Fun Run.",
    status: "registration_open",
    startDate: "2026-12-08",
    endDate: "2026-12-08",
    registrationDeadline: "2026-12-01T23:59:59Z",
    registrationFee: 3000,
    maxParticipants: 200,

    maxTeams: 200,
    squadSize: 1,
    playersOnPitch: 1,
    prizePoolTotal: 50000,
    prizeFirst: 30000,
    prizeSecond: 15000,
    prizeThird: 5000,
    halfDurationMinutes: 0,
    extraTimeMinutes: 0,
    gracePeriodMinutes: 15,
    yellowCardFine: 0,
    redCardFine: 0,

    rulesSummary: "Official bib number required. Water stations every 2.5km. Emergency medical staff on-site. Valid Southern Delta University ID required for student podium eligibility.",
    bannerUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80",
    contactEmail: "marathon@winners-sports.org",
    contactPhone: "+234 803 765 4321",
    confirmedCount: 42,
  },
];

// Seed Teams (16 Teams for WFC with Invite Codes and without matric/department)
export const seedTeams: Team[] = [
  {
    id: "team-01",
    registrationId: "reg-01",
    eventId: "e-football-001",
    name: "Engineering Dynamos",
    shortCode: "ENG",
    captainName: "Chinedu Okafor",
    captainEmail: "c.okafor@student.sdu.edu.ng",
    captainPhone: "08031112233",
    inviteCode: "WFC-ENG-4912",
    seedNumber: 1,
    bracketPosition: 1,
    status: "confirmed",
    createdAt: "2026-11-01T10:00:00Z",
    players: [
      { id: "p-01", fullName: "Chinedu Okafor", email: "c.okafor@student.sdu.edu.ng", phone: "08031112233", jerseyNumber: 10, isCaptain: true, verificationStatus: "verified" },
      { id: "p-02", fullName: "Emeka Nwosu", email: "e.nwosu@student.sdu.edu.ng", phone: "08031112234", jerseyNumber: 7, isCaptain: false, verificationStatus: "verified" },
      { id: "p-03", fullName: "Oviemo Akpan", email: "o.akpan@student.sdu.edu.ng", phone: "08031112235", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
      { id: "p-04", fullName: "Tariere Brisibe", email: "t.brisibe@student.sdu.edu.ng", phone: "08031112236", jerseyNumber: 8, isCaptain: false, verificationStatus: "verified" },
      { id: "p-05", fullName: "Kelvin Osagie", email: "k.osagie@student.sdu.edu.ng", phone: "08031112237", jerseyNumber: 9, isCaptain: false, verificationStatus: "verified" },
      { id: "p-06", fullName: "Blessing Idowu", email: "b.idowu@student.sdu.edu.ng", phone: "08031112238", jerseyNumber: 2, isCaptain: false, verificationStatus: "verified" },
      { id: "p-07", fullName: "Victor Efe", email: "v.efe@student.sdu.edu.ng", phone: "08031112239", jerseyNumber: 11, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-02",
    registrationId: "reg-02",
    eventId: "e-football-001",
    name: "Ozoro City Ballers",
    shortCode: "OCB",
    captainName: "Eseosa Ighodaro",
    captainEmail: "e.ighodaro@student.sdu.edu.ng",
    captainPhone: "08032223344",
    inviteCode: "WFC-OCB-8831",
    seedNumber: 2,
    bracketPosition: 2,
    status: "confirmed",
    createdAt: "2026-11-01T11:15:00Z",
    players: [
      { id: "p-08", fullName: "Eseosa Ighodaro", email: "e.ighodaro@student.sdu.edu.ng", phone: "08032223344", jerseyNumber: 9, isCaptain: true, verificationStatus: "verified" },
      { id: "p-09", fullName: "Samuel Agbaje", email: "s.agbaje@student.sdu.edu.ng", phone: "08032223345", jerseyNumber: 10, isCaptain: false, verificationStatus: "verified" },
      { id: "p-10", fullName: "Collins Uche", email: "c.uche@student.sdu.edu.ng", phone: "08032223346", jerseyNumber: 5, isCaptain: false, verificationStatus: "verified" },
      { id: "p-11", fullName: "Princewill Onu", email: "p.onu@student.sdu.edu.ng", phone: "08032223347", jerseyNumber: 3, isCaptain: false, verificationStatus: "verified" },
      { id: "p-12", fullName: "Kevwe Omovie", email: "k.omovie@student.sdu.edu.ng", phone: "08032223348", jerseyNumber: 7, isCaptain: false, verificationStatus: "verified" },
      { id: "p-13", fullName: "Gideon Maduka", email: "g.maduka@student.sdu.edu.ng", phone: "08032223349", jerseyNumber: 14, isCaptain: false, verificationStatus: "verified" },
      { id: "p-14", fullName: "Osasere Enabulele", email: "o.enabulele@student.sdu.edu.ng", phone: "08032223350", jerseyNumber: 8, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-03",
    registrationId: "reg-03",
    eventId: "e-football-001",
    name: "Delta Falcons FC",
    shortCode: "DFF",
    captainName: "Precious Oghenekaro",
    captainEmail: "p.oghene@student.sdu.edu.ng",
    captainPhone: "08033334455",
    inviteCode: "WFC-DFF-3310",
    seedNumber: 3,
    bracketPosition: 3,
    status: "confirmed",
    createdAt: "2026-11-01T12:00:00Z",
    players: [
      { id: "p-15", fullName: "Precious Oghenekaro", email: "p.oghene@student.sdu.edu.ng", phone: "08033334455", jerseyNumber: 10, isCaptain: true, verificationStatus: "verified" },
      { id: "p-16", fullName: "Godstime Efetobor", email: "g.efetobor@student.sdu.edu.ng", phone: "08033334456", jerseyNumber: 7, isCaptain: false, verificationStatus: "verified" },
      { id: "p-17", fullName: "Harrison Efe", email: "h.efe@student.sdu.edu.ng", phone: "08033334457", jerseyNumber: 6, isCaptain: false, verificationStatus: "verified" },
      { id: "p-18", fullName: "Tega Omoraka", email: "t.omoraka@student.sdu.edu.ng", phone: "08033334458", jerseyNumber: 11, isCaptain: false, verificationStatus: "verified" },
      { id: "p-19", fullName: "Favour Momoh", email: "f.momoh@student.sdu.edu.ng", phone: "08033334459", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
      { id: "p-20", fullName: "David Ubogun", email: "d.ubogun@student.sdu.edu.ng", phone: "08033334460", jerseyNumber: 8, isCaptain: false, verificationStatus: "verified" },
      { id: "p-21", fullName: "Justice Edafe", email: "j.edafe@student.sdu.edu.ng", phone: "08033334461", jerseyNumber: 2, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-04",
    registrationId: "reg-04",
    eventId: "e-football-001",
    name: "Campus Titans",
    shortCode: "CTT",
    captainName: "Daniel Okotete",
    captainEmail: "d.okotete@student.sdu.edu.ng",
    captainPhone: "08034445566",
    inviteCode: "WFC-CTT-1944",
    seedNumber: 4,
    bracketPosition: 4,
    status: "confirmed",
    createdAt: "2026-11-01T13:30:00Z",
    players: [
      { id: "p-22", fullName: "Daniel Okotete", email: "d.okotete@student.sdu.edu.ng", phone: "08034445566", jerseyNumber: 8, isCaptain: true, verificationStatus: "verified" },
      { id: "p-23", fullName: "Marvellous Odjugo", email: "m.odjugo@student.sdu.edu.ng", phone: "08034445567", jerseyNumber: 10, isCaptain: false, verificationStatus: "verified" },
      { id: "p-24", fullName: "Igho Atumah", email: "i.atumah@student.sdu.edu.ng", phone: "08034445568", jerseyNumber: 5, isCaptain: false, verificationStatus: "verified" },
      { id: "p-25", fullName: "Ogagaoghene Ikpasa", email: "o.ikpasa@student.sdu.edu.ng", phone: "08034445569", jerseyNumber: 9, isCaptain: false, verificationStatus: "verified" },
      { id: "p-26", fullName: "Kevwe Okiemute", email: "k.okiemute@student.sdu.edu.ng", phone: "08034445570", jerseyNumber: 3, isCaptain: false, verificationStatus: "verified" },
      { id: "p-27", fullName: "Prosper Anigboro", email: "p.anigboro@student.sdu.edu.ng", phone: "08034445571", jerseyNumber: 7, isCaptain: false, verificationStatus: "verified" },
      { id: "p-28", fullName: "Ochuko Enarhire", email: "o.enarhire@student.sdu.edu.ng", phone: "08034445572", jerseyNumber: 11, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-05",
    registrationId: "reg-05",
    eventId: "e-football-001",
    name: "Agro All-Stars",
    shortCode: "AAS",
    captainName: "Faithful Igbinosa",
    captainEmail: "f.igbinosa@student.sdu.edu.ng",
    captainPhone: "08035556677",
    inviteCode: "WFC-AAS-5501",
    seedNumber: 5,
    bracketPosition: 5,
    status: "confirmed",
    createdAt: "2026-11-02T09:00:00Z",
    players: [
      { id: "p-29", fullName: "Faithful Igbinosa", email: "f.igbinosa@student.sdu.edu.ng", phone: "08035556677", jerseyNumber: 7, isCaptain: true, verificationStatus: "verified" },
      { id: "p-30", fullName: "Paul Erhabor", email: "p.erhabor@student.sdu.edu.ng", phone: "08035556678", jerseyNumber: 10, isCaptain: false, verificationStatus: "verified" },
      { id: "p-31", fullName: "Jerry Osakwe", email: "j.osakwe@student.sdu.edu.ng", phone: "08035556679", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
      { id: "p-32", fullName: "Solomon Eguono", email: "s.eguono@student.sdu.edu.ng", phone: "08035556680", jerseyNumber: 8, isCaptain: false, verificationStatus: "verified" },
      { id: "p-33", fullName: "Moses Orhorhoro", email: "m.orhorhoro@student.sdu.edu.ng", phone: "08035556681", jerseyNumber: 9, isCaptain: false, verificationStatus: "verified" },
      { id: "p-34", fullName: "Peter Okandeji", email: "p.okandeji@student.sdu.edu.ng", phone: "08035556682", jerseyNumber: 5, isCaptain: false, verificationStatus: "verified" },
      { id: "p-35", fullName: "Austin Enakpodia", email: "a.enakpodia@student.sdu.edu.ng", phone: "08035556683", jerseyNumber: 11, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-06",
    registrationId: "reg-06",
    eventId: "e-football-001",
    name: "Ozoro Spartans",
    shortCode: "OSP",
    captainName: "Ejiro Onome",
    captainEmail: "e.onome@student.sdu.edu.ng",
    captainPhone: "08036667788",
    inviteCode: "WFC-OSP-7712",
    seedNumber: 6,
    bracketPosition: 6,
    status: "confirmed",
    createdAt: "2026-11-02T10:30:00Z",
    players: [
      { id: "p-36", fullName: "Ejiro Onome", email: "e.onome@student.sdu.edu.ng", phone: "08036667788", jerseyNumber: 10, isCaptain: true, verificationStatus: "verified" },
      { id: "p-37", fullName: "Akpevwe Edewor", email: "a.edewor@student.sdu.edu.ng", phone: "08036667789", jerseyNumber: 9, isCaptain: false, verificationStatus: "verified" },
      { id: "p-38", fullName: "Stanley Uvwie", email: "s.uvwie@student.sdu.edu.ng", phone: "08036667790", jerseyNumber: 6, isCaptain: false, verificationStatus: "verified" },
      { id: "p-39", fullName: "Sunday Ogaga", email: "s.ogaga@student.sdu.edu.ng", phone: "08036667791", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
      { id: "p-40", fullName: "Efe Agbor", email: "e.agbor@student.sdu.edu.ng", phone: "08036667792", jerseyNumber: 8, isCaptain: false, verificationStatus: "verified" },
      { id: "p-41", fullName: "Clifford Ibru", email: "c.ibru@student.sdu.edu.ng", phone: "08036667793", jerseyNumber: 2, isCaptain: false, verificationStatus: "verified" },
      { id: "p-42", fullName: "Richard Obaro", email: "r.obaro@student.sdu.edu.ng", phone: "08036667794", jerseyNumber: 14, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-07",
    registrationId: "reg-07",
    eventId: "e-football-001",
    name: "Red Devils SDU",
    shortCode: "RDS",
    captainName: "Osita Eze",
    captainEmail: "o.eze@student.sdu.edu.ng",
    captainPhone: "08037778899",
    inviteCode: "WFC-RDS-4009",
    seedNumber: 7,
    bracketPosition: 7,
    status: "confirmed",
    createdAt: "2026-11-02T11:45:00Z",
    players: [
      { id: "p-43", fullName: "Osita Eze", email: "o.eze@student.sdu.edu.ng", phone: "08037778899", jerseyNumber: 11, isCaptain: true, verificationStatus: "verified" },
      { id: "p-44", fullName: "Chukwudi Obi", email: "c.obi@student.sdu.edu.ng", phone: "08037778900", jerseyNumber: 10, isCaptain: false, verificationStatus: "verified" },
      { id: "p-45", fullName: "Buchi Nnamdi", email: "b.nnamdi@student.sdu.edu.ng", phone: "08037778901", jerseyNumber: 7, isCaptain: false, verificationStatus: "verified" },
      { id: "p-46", fullName: "Tochukwu Kalu", email: "t.kalu@student.sdu.edu.ng", phone: "08037778902", jerseyNumber: 3, isCaptain: false, verificationStatus: "verified" },
      { id: "p-47", fullName: "Somtochukwu Ilodigwe", email: "s.ilodigwe@student.sdu.edu.ng", phone: "08037778903", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
      { id: "p-48", fullName: "Nonso Madueke", email: "n.madueke@student.sdu.edu.ng", phone: "08037778904", jerseyNumber: 8, isCaptain: false, verificationStatus: "verified" },
      { id: "p-49", fullName: "Ifeanyi Anyanwu", email: "i.anyanwu@student.sdu.edu.ng", phone: "08037778905", jerseyNumber: 5, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-08",
    registrationId: "reg-08",
    eventId: "e-football-001",
    name: "Golden Strikers",
    shortCode: "GST",
    captainName: "Komeh Ediri",
    captainEmail: "k.ediri@student.sdu.edu.ng",
    captainPhone: "08038889900",
    inviteCode: "WFC-GST-9122",
    seedNumber: 8,
    bracketPosition: 8,
    status: "confirmed",
    createdAt: "2026-11-02T13:00:00Z",
    players: [
      { id: "p-50", fullName: "Komeh Ediri", email: "k.ediri@student.sdu.edu.ng", phone: "08038889900", jerseyNumber: 9, isCaptain: true, verificationStatus: "verified" },
      { id: "p-51", fullName: "Blessing Igbu", email: "b.igbu@student.sdu.edu.ng", phone: "08038889901", jerseyNumber: 7, isCaptain: false, verificationStatus: "verified" },
      { id: "p-52", fullName: "Oghenerukevwe Efe", email: "o.rukevwe@student.sdu.edu.ng", phone: "08038889902", jerseyNumber: 10, isCaptain: false, verificationStatus: "verified" },
      { id: "p-53", fullName: "Oghenetega Clark", email: "o.clark@student.sdu.edu.ng", phone: "08038889903", jerseyNumber: 5, isCaptain: false, verificationStatus: "verified" },
      { id: "p-54", fullName: "Onoriode Okoloko", email: "o.okoloko@student.sdu.edu.ng", phone: "08038889904", jerseyNumber: 2, isCaptain: false, verificationStatus: "verified" },
      { id: "p-55", fullName: "Mudiaga Oweh", email: "m.oweh@student.sdu.edu.ng", phone: "08038889905", jerseyNumber: 8, isCaptain: false, verificationStatus: "verified" },
      { id: "p-56", fullName: "Tosan Wilkie", email: "t.wilkie@student.sdu.edu.ng", phone: "08038889906", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-09",
    registrationId: "reg-09",
    eventId: "e-football-001",
    name: "Phoenix Knights",
    shortCode: "PHK",
    captainName: "Toluwani Adeyemi",
    captainEmail: "t.adeyemi@student.sdu.edu.ng",
    captainPhone: "08039990011",
    inviteCode: "WFC-PHK-2201",
    seedNumber: 9,
    bracketPosition: 9,
    status: "confirmed",
    createdAt: "2026-11-03T09:30:00Z",
    players: [
      { id: "p-57", fullName: "Toluwani Adeyemi", email: "t.adeyemi@student.sdu.edu.ng", phone: "08039990011", jerseyNumber: 10, isCaptain: true, verificationStatus: "verified" },
      { id: "p-58", fullName: "Femi Falana", email: "f.falana@student.sdu.edu.ng", phone: "08039990012", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
      { id: "p-59", fullName: "Kunle Ajayi", email: "k.ajayi@student.sdu.edu.ng", phone: "08039990013", jerseyNumber: 8, isCaptain: false, verificationStatus: "verified" },
      { id: "p-60", fullName: "Damilola Ojo", email: "d.ojo@student.sdu.edu.ng", phone: "08039990014", jerseyNumber: 7, isCaptain: false, verificationStatus: "verified" },
      { id: "p-61", fullName: "Seyi Makinde", email: "s.makinde@student.sdu.edu.ng", phone: "08039990015", jerseyNumber: 9, isCaptain: false, verificationStatus: "verified" },
      { id: "p-62", fullName: "Bayo Olatunji", email: "b.olatunji@student.sdu.edu.ng", phone: "08039990016", jerseyNumber: 3, isCaptain: false, verificationStatus: "verified" },
      { id: "p-63", fullName: "Segun Popoola", email: "s.popoola@student.sdu.edu.ng", phone: "08039990017", jerseyNumber: 2, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-10",
    registrationId: "reg-10",
    eventId: "e-football-001",
    name: "Thunderbolts United",
    shortCode: "TBU",
    captainName: "Eromosele Akhere",
    captainEmail: "e.akhere@student.sdu.edu.ng",
    captainPhone: "08030001122",
    inviteCode: "WFC-TBU-6641",
    seedNumber: 10,
    bracketPosition: 10,
    status: "confirmed",
    createdAt: "2026-11-03T11:00:00Z",
    players: [
      { id: "p-64", fullName: "Eromosele Akhere", email: "e.akhere@student.sdu.edu.ng", phone: "08030001122", jerseyNumber: 7, isCaptain: true, verificationStatus: "verified" },
      { id: "p-65", fullName: "Osaro Igbinedion", email: "o.igbinedion@student.sdu.edu.ng", phone: "08030001123", jerseyNumber: 10, isCaptain: false, verificationStatus: "verified" },
      { id: "p-66", fullName: "Idahosa Omoigui", email: "i.omoigui@student.sdu.edu.ng", phone: "08030001124", jerseyNumber: 6, isCaptain: false, verificationStatus: "verified" },
      { id: "p-67", fullName: "Uyi Aghahowa", email: "u.aghahowa@student.sdu.edu.ng", phone: "08030001125", jerseyNumber: 9, isCaptain: false, verificationStatus: "verified" },
      { id: "p-68", fullName: "Nosakhare Idehen", email: "n.idehen@student.sdu.edu.ng", phone: "08030001126", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
      { id: "p-69", fullName: "Efe Omoregie", email: "e.omoregie@student.sdu.edu.ng", phone: "08030001127", jerseyNumber: 5, isCaptain: false, verificationStatus: "verified" },
      { id: "p-70", fullName: "Efosa Akenzua", email: "e.akenzua@student.sdu.edu.ng", phone: "08030001128", jerseyNumber: 11, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-11",
    registrationId: "reg-11",
    eventId: "e-football-001",
    name: "Ozoro All-Stars",
    shortCode: "OAS",
    captainName: "Tarila Ebikeme",
    captainEmail: "t.ebikeme@student.sdu.edu.ng",
    captainPhone: "08031234567",
    inviteCode: "WFC-OAS-1189",
    seedNumber: 11,
    bracketPosition: 11,
    status: "confirmed",
    createdAt: "2026-11-03T14:15:00Z",
    players: [
      { id: "p-71", fullName: "Tarila Ebikeme", email: "t.ebikeme@student.sdu.edu.ng", phone: "08031234567", jerseyNumber: 10, isCaptain: true, verificationStatus: "verified" },
      { id: "p-72", fullName: "Ebipade Doubra", email: "e.doubra@student.sdu.edu.ng", phone: "08031234568", jerseyNumber: 9, isCaptain: false, verificationStatus: "verified" },
      { id: "p-73", fullName: "Preye Timipre", email: "p.timipre@student.sdu.edu.ng", phone: "08031234569", jerseyNumber: 7, isCaptain: false, verificationStatus: "verified" },
      { id: "p-74", fullName: "Ebiere Alabrah", email: "e.alabrah@student.sdu.edu.ng", phone: "08031234570", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
      { id: "p-75", fullName: "Perewari Dorgu", email: "p.dorgu@student.sdu.edu.ng", phone: "08031234571", jerseyNumber: 8, isCaptain: false, verificationStatus: "verified" },
      { id: "p-76", fullName: "Tombra Ogidi", email: "t.ogidi@student.sdu.edu.ng", phone: "08031234572", jerseyNumber: 2, isCaptain: false, verificationStatus: "verified" },
      { id: "p-77", fullName: "Kurotimi George", email: "k.george@student.sdu.edu.ng", phone: "08031234573", jerseyNumber: 5, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-12",
    registrationId: "reg-12",
    eventId: "e-football-001",
    name: "SDU Invincibles",
    shortCode: "SDI",
    captainName: "Ubong Bassey",
    captainEmail: "u.bassey@student.sdu.edu.ng",
    captainPhone: "08032345678",
    inviteCode: "WFC-SDI-5012",
    seedNumber: 12,
    bracketPosition: 12,
    status: "confirmed",
    createdAt: "2026-11-04T09:00:00Z",
    players: [
      { id: "p-78", fullName: "Ubong Bassey", email: "u.bassey@student.sdu.edu.ng", phone: "08032345678", jerseyNumber: 8, isCaptain: true, verificationStatus: "verified" },
      { id: "p-79", fullName: "Etido Essien", email: "e.essien@student.sdu.edu.ng", phone: "08032345679", jerseyNumber: 11, isCaptain: false, verificationStatus: "verified" },
      { id: "p-80", fullName: "Aniefiok Udoh", email: "a.udoh@student.sdu.edu.ng", phone: "08032345680", jerseyNumber: 10, isCaptain: false, verificationStatus: "verified" },
      { id: "p-81", fullName: "Inemesit Akpan", email: "i.akpan@student.sdu.edu.ng", phone: "08032345681", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
      { id: "p-82", fullName: "Kufre Archibong", email: "k.archibong@student.sdu.edu.ng", phone: "08032345682", jerseyNumber: 7, isCaptain: false, verificationStatus: "verified" },
      { id: "p-83", fullName: "Edidiong Asuquo", email: "e.asuquo@student.sdu.edu.ng", phone: "08032345683", jerseyNumber: 3, isCaptain: false, verificationStatus: "verified" },
      { id: "p-84", fullName: "Nsikan Ekong", email: "n.ekong@student.sdu.edu.ng", phone: "08032345684", jerseyNumber: 6, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-13",
    registrationId: "reg-13",
    eventId: "e-football-001",
    name: "Redeemed Warriors",
    shortCode: "RDW",
    captainName: "Ezekiel Agbonlahor",
    captainEmail: "e.agbonlahor@student.sdu.edu.ng",
    captainPhone: "08033456789",
    inviteCode: "WFC-RDW-7890",
    seedNumber: 13,
    bracketPosition: 13,
    status: "confirmed",
    createdAt: "2026-11-04T11:20:00Z",
    players: [
      { id: "p-85", fullName: "Ezekiel Agbonlahor", email: "e.agbonlahor@student.sdu.edu.ng", phone: "08033456789", jerseyNumber: 7, isCaptain: true, verificationStatus: "verified" },
      { id: "p-86", fullName: "Joshua Osemwegie", email: "j.osemwegie@student.sdu.edu.ng", phone: "08033456790", jerseyNumber: 9, isCaptain: false, verificationStatus: "verified" },
      { id: "p-87", fullName: "Caleb Igbinedion", email: "c.igbinedion@student.sdu.edu.ng", phone: "08033456791", jerseyNumber: 10, isCaptain: false, verificationStatus: "verified" },
      { id: "p-88", fullName: "Gideon Ehigiator", email: "g.ehigiator@student.sdu.edu.ng", phone: "08033456792", jerseyNumber: 5, isCaptain: false, verificationStatus: "verified" },
      { id: "p-89", fullName: "Timothy Osahon", email: "t.osahon@student.sdu.edu.ng", phone: "08033456793", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
      { id: "p-90", fullName: "David Izekor", email: "d.izekor@student.sdu.edu.ng", phone: "08033456794", jerseyNumber: 2, isCaptain: false, verificationStatus: "verified" },
      { id: "p-91", fullName: "Nathaniel Osaze", email: "n.osaze@student.sdu.edu.ng", phone: "08033456795", jerseyNumber: 8, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-14",
    registrationId: "reg-14",
    eventId: "e-football-001",
    name: "Kings of Monkey Post",
    shortCode: "KMP",
    captainName: "Oghenero Ovwigho",
    captainEmail: "o.ovwigho@student.sdu.edu.ng",
    captainPhone: "08034567890",
    inviteCode: "WFC-KMP-4455",
    seedNumber: 14,
    bracketPosition: 14,
    status: "confirmed",
    createdAt: "2026-11-04T13:40:00Z",
    players: [
      { id: "p-92", fullName: "Oghenero Ovwigho", email: "o.ovwigho@student.sdu.edu.ng", phone: "08034567890", jerseyNumber: 10, isCaptain: true, verificationStatus: "verified" },
      { id: "p-93", fullName: "Ochuko Arigbe", email: "o.arigbe@student.sdu.edu.ng", phone: "08034567891", jerseyNumber: 8, isCaptain: false, verificationStatus: "verified" },
      { id: "p-94", fullName: "Mudiaga Omote", email: "m.omote@student.sdu.edu.ng", phone: "08034567892", jerseyNumber: 7, isCaptain: false, verificationStatus: "verified" },
      { id: "p-95", fullName: "Efevwere Onoriode", email: "e.onoriode@student.sdu.edu.ng", phone: "08034567893", jerseyNumber: 9, isCaptain: false, verificationStatus: "verified" },
      { id: "p-96", fullName: "Godspower Ojarikre", email: "g.ojarikre@student.sdu.edu.ng", phone: "08034567894", jerseyNumber: 3, isCaptain: false, verificationStatus: "verified" },
      { id: "p-97", fullName: "Tega Onokpise", email: "t.onokpise@student.sdu.edu.ng", phone: "08034567895", jerseyNumber: 5, isCaptain: false, verificationStatus: "verified" },
      { id: "p-98", fullName: "Onome Erharhaghen", email: "o.erharhaghen@student.sdu.edu.ng", phone: "08034567896", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-15",
    registrationId: "reg-15",
    eventId: "e-football-001",
    name: "Southern Stars",
    shortCode: "SST",
    captainName: "Ebiakpo Tamara",
    captainEmail: "e.tamara@student.sdu.edu.ng",
    captainPhone: "08035678901",
    inviteCode: "WFC-SST-3381",
    seedNumber: 15,
    bracketPosition: 15,
    status: "confirmed",
    createdAt: "2026-11-04T15:00:00Z",
    players: [
      { id: "p-99", fullName: "Ebiakpo Tamara", email: "e.tamara@student.sdu.edu.ng", phone: "08035678901", jerseyNumber: 11, isCaptain: true, verificationStatus: "verified" },
      { id: "p-100", fullName: "Preye Okardi", email: "p.okardi@student.sdu.edu.ng", phone: "08035678902", jerseyNumber: 10, isCaptain: false, verificationStatus: "verified" },
      { id: "p-101", fullName: "Timiebi Ken", email: "t.ken@student.sdu.edu.ng", phone: "08035678903", jerseyNumber: 8, isCaptain: false, verificationStatus: "verified" },
      { id: "p-102", fullName: "Diepreye Alagoa", email: "d.alagoa@student.sdu.edu.ng", phone: "08035678904", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
      { id: "p-103", fullName: "Boma Amangala", email: "b.amangala@student.sdu.edu.ng", phone: "08035678905", jerseyNumber: 7, isCaptain: false, verificationStatus: "verified" },
      { id: "p-104", fullName: "Tari Wodu", email: "t.wodu@student.sdu.edu.ng", phone: "08035678906", jerseyNumber: 3, isCaptain: false, verificationStatus: "verified" },
      { id: "p-105", fullName: "Woyengikuro Fente", email: "w.fente@student.sdu.edu.ng", phone: "08035678907", jerseyNumber: 6, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-16",
    registrationId: "reg-16",
    eventId: "e-football-001",
    name: "Ozoro Lions FC",
    shortCode: "OLC",
    captainName: "Uchechukwu Okeke",
    captainEmail: "u.okeke@student.sdu.edu.ng",
    captainPhone: "08036789012",
    inviteCode: "WFC-OLC-9021",
    seedNumber: 16,
    bracketPosition: 16,
    status: "confirmed",
    createdAt: "2026-11-04T16:30:00Z",
    players: [
      { id: "p-106", fullName: "Uchechukwu Okeke", email: "u.okeke@student.sdu.edu.ng", phone: "08036789012", jerseyNumber: 9, isCaptain: true, verificationStatus: "verified" },
      { id: "p-107", fullName: "Somadina Eze", email: "s.eze@student.sdu.edu.ng", phone: "08036789013", jerseyNumber: 7, isCaptain: false, verificationStatus: "verified" },
      { id: "p-108", fullName: "Chukwuma Anozie", email: "c.anozie@student.sdu.edu.ng", phone: "08036789014", jerseyNumber: 10, isCaptain: false, verificationStatus: "verified" },
      { id: "p-109", fullName: "Ebuka Nwabueze", email: "e.nwabueze@student.sdu.edu.ng", phone: "08036789015", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
      { id: "p-110", fullName: "Kenechukwu Mbah", email: "k.mbah@student.sdu.edu.ng", phone: "08036789016", jerseyNumber: 8, isCaptain: false, verificationStatus: "verified" },
      { id: "p-111", fullName: "Chimaobi Nduka", email: "c.nduka@student.sdu.edu.ng", phone: "08036789017", jerseyNumber: 2, isCaptain: false, verificationStatus: "verified" },
      { id: "p-112", fullName: "Obinna Opara", email: "o.opara@student.sdu.edu.ng", phone: "08036789018", jerseyNumber: 5, isCaptain: false, verificationStatus: "verified" },
    ],
  },
];

// Seed Matches
export const seedMatches: Match[] = [
  // Round of 16 (Matches 1-8)
  {
    id: "m-01",
    eventId: "e-football-001",
    round: "round_of_16",
    roundLabel: "Round of 16",
    matchNumber: 1,
    teamAId: "team-01",
    teamBId: "team-16",
    scheduledTime: "2026-11-20T14:00:00Z",
    pitchLocation: "SDU Pitch 1 (Monkey Post A)",
    status: "completed",
    scoreA: 3,
    scoreB: 1,
    isExtraTime: false,
    isPenaltyShootout: false,
    winnerTeamId: "team-01",
    refereeName: "Mr. Augustine Ikimi",
    matchCoordinatorName: "Engr. Kenneth O",
    phoneOperatorName: "Volunteer Tobi (iPhone 14 Pro)",
    matchReport: "High tempo match. Chinedu Okafor opened scoring at 12' with a low drive. Team B equalized at 25' before Engineering Dynamos netted two quick goals late in second half.",
    events: [
      { id: "ev-01", matchId: "m-01", teamId: "team-01", playerId: "p-01", playerName: "Chinedu Okafor", eventType: "goal", minute: 12, createdAt: "2026-11-20T14:12:00Z" },
      { id: "ev-02", matchId: "m-01", teamId: "team-16", playerId: "p-106", playerName: "Uchechukwu Okeke", eventType: "goal", minute: 25, createdAt: "2026-11-20T14:25:00Z" },
      { id: "ev-03", matchId: "m-01", teamId: "team-01", playerId: "p-02", playerName: "Emeka Nwosu", eventType: "goal", minute: 34, createdAt: "2026-11-20T14:34:00Z" },
      { id: "ev-04", matchId: "m-01", teamId: "team-16", playerId: "p-109", playerName: "Ebuka Nwabueze", eventType: "yellow_card", minute: 36, fineAmount: 1000, fineStatus: "paid", notes: "Tripping restart", createdAt: "2026-11-20T14:36:00Z" },
      { id: "ev-05", matchId: "m-01", teamId: "team-01", playerId: "p-05", playerName: "Kelvin Osagie", eventType: "goal", minute: 39, createdAt: "2026-11-20T14:39:00Z" },
    ],
  },
  {
    id: "m-02",
    eventId: "e-football-001",
    round: "round_of_16",
    roundLabel: "Round of 16",
    matchNumber: 2,
    teamAId: "team-08",
    teamBId: "team-09",
    scheduledTime: "2026-11-20T15:30:00Z",
    pitchLocation: "SDU Pitch 1 (Monkey Post A)",
    status: "completed",
    scoreA: 2,
    scoreB: 2,
    isExtraTime: true,
    scoreAExtraTime: 0,
    scoreBExtraTime: 0,
    isPenaltyShootout: true,
    scoreAPenalties: 3,
    scoreBPenalties: 2,
    winnerTeamId: "team-08",
    refereeName: "Mr. Festus Orovwuje",
    matchCoordinatorName: "Engr. Kenneth O",
    phoneOperatorName: "Volunteer Blessing (Samsung S23)",
    matchReport: "Thrilling match ending 2-2 in regulation time. 5 minutes extra time produced no goals. Golden Strikers won 3-2 on long-distance penalty spot kicks.",
    events: [
      { id: "ev-06", matchId: "m-02", teamId: "team-08", playerId: "p-50", playerName: "Komeh Ediri", eventType: "goal", minute: 8, createdAt: "2026-11-20T15:38:00Z" },
      { id: "ev-07", matchId: "m-02", teamId: "team-09", playerId: "p-57", playerName: "Toluwani Adeyemi", eventType: "goal", minute: 18, createdAt: "2026-11-20T15:48:00Z" },
      { id: "ev-08", matchId: "m-02", teamId: "team-09", playerId: "p-61", playerName: "Seyi Makinde", eventType: "goal", minute: 28, createdAt: "2026-11-20T15:58:00Z" },
      { id: "ev-09", matchId: "m-02", teamId: "team-08", playerId: "p-52", playerName: "Oghenerukevwe Efe", eventType: "goal", minute: 37, createdAt: "2026-11-20T16:07:00Z" },
      { id: "ev-10", matchId: "m-02", teamId: "team-09", playerId: "p-58", playerName: "Femi Falana", eventType: "yellow_card", minute: 38, fineAmount: 1000, fineStatus: "paid", notes: "Dissent", createdAt: "2026-11-20T16:08:00Z" },
    ],
  },
  {
    id: "m-03",
    eventId: "e-football-001",
    round: "round_of_16",
    roundLabel: "Round of 16",
    matchNumber: 3,
    teamAId: "team-04",
    teamBId: "team-13",
    scheduledTime: "2026-11-21T14:00:00Z",
    pitchLocation: "SDU Pitch 2 (Monkey Post B)",
    status: "completed",
    scoreA: 2,
    scoreB: 0,
    isExtraTime: false,
    isPenaltyShootout: false,
    winnerTeamId: "team-04",
    refereeName: "Mr. Augustine Ikimi",
    matchCoordinatorName: "David O",
    phoneOperatorName: "Volunteer Tobi",
    events: [
      { id: "ev-11", matchId: "m-03", teamId: "team-04", playerId: "p-23", playerName: "Marvellous Odjugo", eventType: "goal", minute: 14, createdAt: "2026-11-21T14:14:00Z" },
      { id: "ev-12", matchId: "m-03", teamId: "team-04", playerId: "p-25", playerName: "Ogagaoghene Ikpasa", eventType: "goal", minute: 32, createdAt: "2026-11-21T14:32:00Z" },
      { id: "ev-13", matchId: "m-03", teamId: "team-13", playerId: "p-86", playerName: "Joshua Osemwegie", eventType: "yellow_card", minute: 35, fineAmount: 1000, fineStatus: "paid", createdAt: "2026-11-21T14:35:00Z" },
    ],
  },
  {
    id: "m-04",
    eventId: "e-football-001",
    round: "round_of_16",
    roundLabel: "Round of 16",
    matchNumber: 4,
    teamAId: "team-05",
    teamBId: "team-12",
    scheduledTime: "2026-11-21T15:30:00Z",
    pitchLocation: "SDU Pitch 2 (Monkey Post B)",
    status: "completed",
    scoreA: 1,
    scoreB: 2,
    isExtraTime: false,
    isPenaltyShootout: false,
    winnerTeamId: "team-12",
    refereeName: "Mr. Festus Orovwuje",
    matchCoordinatorName: "David O",
    phoneOperatorName: "Volunteer Kome",
    events: [
      { id: "ev-14", matchId: "m-04", teamId: "team-05", playerId: "p-29", playerName: "Faithful Igbinosa", eventType: "goal", minute: 6, createdAt: "2026-11-21T15:36:00Z" },
      { id: "ev-15", matchId: "m-04", teamId: "team-12", playerId: "p-78", playerName: "Ubong Bassey", eventType: "goal", minute: 22, createdAt: "2026-11-21T15:52:00Z" },
      { id: "ev-16", matchId: "m-04", teamId: "team-12", playerId: "p-80", playerName: "Aniefiok Udoh", eventType: "goal", minute: 38, createdAt: "2026-11-21T16:08:00Z" },
    ],
  },
  {
    id: "m-05",
    eventId: "e-football-001",
    round: "round_of_16",
    roundLabel: "Round of 16",
    matchNumber: 5,
    teamAId: "team-02",
    teamBId: "team-15",
    scheduledTime: "2026-11-22T14:00:00Z",
    pitchLocation: "SDU Pitch 1",
    status: "completed",
    scoreA: 4,
    scoreB: 1,
    isExtraTime: false,
    isPenaltyShootout: false,
    winnerTeamId: "team-02",
    refereeName: "Mr. Augustine Ikimi",
    events: [
      { id: "ev-17", matchId: "m-05", teamId: "team-02", playerId: "p-08", playerName: "Eseosa Ighodaro", eventType: "goal", minute: 4, createdAt: "2026-11-22T14:04:00Z" },
      { id: "ev-18", matchId: "m-05", teamId: "team-02", playerId: "p-09", playerName: "Samuel Agbaje", eventType: "goal", minute: 15, createdAt: "2026-11-22T14:15:00Z" },
      { id: "ev-19", matchId: "m-05", teamId: "team-15", playerId: "p-99", playerName: "Ebiakpo Tamara", eventType: "goal", minute: 29, createdAt: "2026-11-22T14:29:00Z" },
      { id: "ev-20", matchId: "m-05", teamId: "team-02", playerId: "p-08", playerName: "Eseosa Ighodaro", eventType: "goal", minute: 33, createdAt: "2026-11-22T14:33:00Z" },
      { id: "ev-21", matchId: "m-05", teamId: "team-02", playerId: "p-12", playerName: "Kevwe Omovie", eventType: "goal", minute: 39, createdAt: "2026-11-22T14:39:00Z" },
    ],
  },
  {
    id: "m-06",
    eventId: "e-football-001",
    round: "round_of_16",
    roundLabel: "Round of 16",
    matchNumber: 6,
    teamAId: "team-07",
    teamBId: "team-10",
    scheduledTime: "2026-11-22T15:30:00Z",
    pitchLocation: "SDU Pitch 1",
    status: "completed",
    scoreA: 1,
    scoreB: 0,
    isExtraTime: false,
    isPenaltyShootout: false,
    winnerTeamId: "team-07",
    refereeName: "Mr. Festus Orovwuje",
    events: [
      { id: "ev-22", matchId: "m-06", teamId: "team-07", playerId: "p-43", playerName: "Osita Eze", eventType: "goal", minute: 27, createdAt: "2026-11-22T15:57:00Z" },
      { id: "ev-23", matchId: "m-06", teamId: "team-10", playerId: "p-67", playerName: "Uyi Aghahowa", eventType: "red_card", minute: 35, fineAmount: 3000, fineStatus: "pending", notes: "Dangerous tackle on counterattack. ₦3,000 fine & 1-match ban.", createdAt: "2026-11-22T16:05:00Z" },
      { id: "ev-24", matchId: "m-06", teamId: "team-10", eventType: "var_review", minute: 36, notes: "Captain review appeal for red card decision; referee viewed phone footage and confirmed red card.", createdAt: "2026-11-22T16:06:00Z" },
    ],
  },
  {
    id: "m-07",
    eventId: "e-football-001",
    round: "round_of_16",
    roundLabel: "Round of 16",
    matchNumber: 7,
    teamAId: "team-03",
    teamBId: "team-14",
    scheduledTime: "2026-11-23T14:00:00Z",
    pitchLocation: "SDU Pitch 2",
    status: "completed",
    scoreA: 3,
    scoreB: 2,
    isExtraTime: false,
    isPenaltyShootout: false,
    winnerTeamId: "team-03",
    refereeName: "Mr. Augustine Ikimi",
    events: [
      { id: "ev-25", matchId: "m-07", teamId: "team-03", playerId: "p-15", playerName: "Precious Oghenekaro", eventType: "goal", minute: 5, createdAt: "2026-11-23T14:05:00Z" },
      { id: "ev-26", matchId: "m-07", teamId: "team-14", playerId: "p-92", playerName: "Oghenero Ovwigho", eventType: "goal", minute: 18, createdAt: "2026-11-23T14:18:00Z" },
      { id: "ev-27", matchId: "m-07", teamId: "team-03", playerId: "p-16", playerName: "Godstime Efetobor", eventType: "goal", minute: 26, createdAt: "2026-11-23T14:26:00Z" },
      { id: "ev-28", matchId: "m-07", teamId: "team-14", playerId: "p-95", playerName: "Efevwere Onoriode", eventType: "goal", minute: 31, createdAt: "2026-11-23T14:31:00Z" },
      { id: "ev-29", matchId: "m-07", teamId: "team-03", playerId: "p-15", playerName: "Precious Oghenekaro", eventType: "goal", minute: 38, createdAt: "2026-11-23T14:38:00Z" },
    ],
  },
  {
    id: "m-08",
    eventId: "e-football-001",
    round: "round_of_16",
    roundLabel: "Round of 16",
    matchNumber: 8,
    teamAId: "team-06",
    teamBId: "team-11",
    scheduledTime: "2026-11-23T15:30:00Z",
    pitchLocation: "SDU Pitch 2",
    status: "completed",
    scoreA: 2,
    scoreB: 1,
    isExtraTime: false,
    isPenaltyShootout: false,
    winnerTeamId: "team-06",
    refereeName: "Mr. Festus Orovwuje",
    events: [
      { id: "ev-30", matchId: "m-08", teamId: "team-06", playerId: "p-36", playerName: "Ejiro Onome", eventType: "goal", minute: 11, createdAt: "2026-11-23T15:41:00Z" },
      { id: "ev-31", matchId: "m-08", teamId: "team-11", playerId: "p-71", playerName: "Tarila Ebikeme", eventType: "goal", minute: 22, createdAt: "2026-11-23T15:52:00Z" },
      { id: "ev-32", matchId: "m-08", teamId: "team-06", playerId: "p-37", playerName: "Akpevwe Edewor", eventType: "goal", minute: 36, createdAt: "2026-11-23T16:06:00Z" },
    ],
  },

  // Quarter-Finals (Matches 9-12)
  {
    id: "m-09",
    eventId: "e-football-001",
    round: "quarter_finals",
    roundLabel: "Quarter-Final 1",
    matchNumber: 9,
    teamAId: "team-01",
    teamBId: "team-08",
    scheduledTime: "2026-11-26T14:00:00Z",
    pitchLocation: "SDU Main Pitch",
    status: "completed",
    scoreA: 2,
    scoreB: 1,
    isExtraTime: false,
    isPenaltyShootout: false,
    winnerTeamId: "team-01",
    refereeName: "Mr. Augustine Ikimi",
    events: [
      { id: "ev-33", matchId: "m-09", teamId: "team-01", playerId: "p-01", playerName: "Chinedu Okafor", eventType: "goal", minute: 14, createdAt: "2026-11-26T14:14:00Z" },
      { id: "ev-34", matchId: "m-09", teamId: "team-08", playerId: "p-50", playerName: "Komeh Ediri", eventType: "goal", minute: 29, createdAt: "2026-11-26T14:29:00Z" },
      { id: "ev-35", matchId: "m-09", teamId: "team-01", playerId: "p-04", playerName: "Tariere Brisibe", eventType: "goal", minute: 38, createdAt: "2026-11-26T14:38:00Z" },
    ],
  },
  {
    id: "m-10",
    eventId: "e-football-001",
    round: "quarter_finals",
    roundLabel: "Quarter-Final 2",
    matchNumber: 10,
    teamAId: "team-04",
    teamBId: "team-12",
    scheduledTime: "2026-11-26T15:30:00Z",
    pitchLocation: "SDU Main Pitch",
    status: "completed",
    scoreA: 0,
    scoreB: 1,
    isExtraTime: false,
    isPenaltyShootout: false,
    winnerTeamId: "team-12",
    refereeName: "Mr. Festus Orovwuje",
    events: [
      { id: "ev-36", matchId: "m-10", teamId: "team-12", playerId: "p-78", playerName: "Ubong Bassey", eventType: "goal", minute: 31, createdAt: "2026-11-26T16:01:00Z" },
    ],
  },
  {
    id: "m-11",
    eventId: "e-football-001",
    round: "quarter_finals",
    roundLabel: "Quarter-Final 3",
    matchNumber: 11,
    teamAId: "team-02",
    teamBId: "team-07",
    scheduledTime: "2026-11-27T14:00:00Z",
    pitchLocation: "SDU Main Pitch",
    status: "completed",
    scoreA: 3,
    scoreB: 2,
    isExtraTime: false,
    isPenaltyShootout: false,
    winnerTeamId: "team-02",
    refereeName: "Mr. Augustine Ikimi",
    events: [
      { id: "ev-37", matchId: "m-11", teamId: "team-02", playerId: "p-08", playerName: "Eseosa Ighodaro", eventType: "goal", minute: 9, createdAt: "2026-11-27T14:09:00Z" },
      { id: "ev-38", matchId: "m-11", teamId: "team-07", playerId: "p-43", playerName: "Osita Eze", eventType: "goal", minute: 17, createdAt: "2026-11-27T14:17:00Z" },
      { id: "ev-39", matchId: "m-11", teamId: "team-02", playerId: "p-09", playerName: "Samuel Agbaje", eventType: "goal", minute: 25, createdAt: "2026-11-27T14:25:00Z" },
      { id: "ev-40", matchId: "m-11", teamId: "team-07", playerId: "p-45", playerName: "Buchi Nnamdi", eventType: "goal", minute: 33, createdAt: "2026-11-27T14:33:00Z" },
      { id: "ev-41", matchId: "m-11", teamId: "team-02", playerId: "p-08", playerName: "Eseosa Ighodaro", eventType: "goal", minute: 39, createdAt: "2026-11-27T14:39:00Z" },
    ],
  },
  {
    id: "m-12",
    eventId: "e-football-001",
    round: "quarter_finals",
    roundLabel: "Quarter-Final 4",
    matchNumber: 12,
    teamAId: "team-03",
    teamBId: "team-06",
    scheduledTime: "2026-11-27T15:30:00Z",
    pitchLocation: "SDU Main Pitch",
    status: "completed",
    scoreA: 2,
    scoreB: 0,
    isExtraTime: false,
    isPenaltyShootout: false,
    winnerTeamId: "team-03",
    refereeName: "Mr. Festus Orovwuje",
    events: [
      { id: "ev-42", matchId: "m-12", teamId: "team-03", playerId: "p-15", playerName: "Precious Oghenekaro", eventType: "goal", minute: 19, createdAt: "2026-11-27T15:49:00Z" },
      { id: "ev-43", matchId: "m-12", teamId: "team-03", playerId: "p-16", playerName: "Godstime Efetobor", eventType: "goal", minute: 36, createdAt: "2026-11-27T16:06:00Z" },
    ],
  },

  // Semi-Finals (Matches 13-14)
  {
    id: "m-13",
    eventId: "e-football-001",
    round: "semi_finals",
    roundLabel: "Semi-Final 1",
    matchNumber: 13,
    teamAId: "team-01",
    teamBId: "team-12",
    scheduledTime: "2026-11-30T14:30:00Z",
    pitchLocation: "SDU Main Stadium Pitch",
    status: "completed",
    scoreA: 2,
    scoreB: 1,
    isExtraTime: false,
    isPenaltyShootout: false,
    winnerTeamId: "team-01",
    refereeName: "Mr. Augustine Ikimi",
    events: [
      { id: "ev-44", matchId: "m-13", teamId: "team-01", playerId: "p-01", playerName: "Chinedu Okafor", eventType: "goal", minute: 15, createdAt: "2026-11-30T14:45:00Z" },
      { id: "ev-45", matchId: "m-13", teamId: "team-12", playerId: "p-78", playerName: "Ubong Bassey", eventType: "goal", minute: 28, createdAt: "2026-11-30T14:58:00Z" },
      { id: "ev-46", matchId: "m-13", teamId: "team-01", playerId: "p-02", playerName: "Emeka Nwosu", eventType: "goal", minute: 37, createdAt: "2026-11-30T15:07:00Z" },
    ],
  },
  {
    id: "m-14",
    eventId: "e-football-001",
    round: "semi_finals",
    roundLabel: "Semi-Final 2",
    matchNumber: 14,
    teamAId: "team-02",
    teamBId: "team-03",
    scheduledTime: "2026-11-30T16:00:00Z",
    pitchLocation: "SDU Main Stadium Pitch",
    status: "completed",
    scoreA: 1,
    scoreB: 0,
    isExtraTime: false,
    isPenaltyShootout: false,
    winnerTeamId: "team-02",
    refereeName: "Mr. Festus Orovwuje",
    events: [
      { id: "ev-47", matchId: "m-14", teamId: "team-02", playerId: "p-08", playerName: "Eseosa Ighodaro", eventType: "goal", minute: 22, createdAt: "2026-11-30T16:22:00Z" },
    ],
  },

  // Third Place Playoff (Match 15)
  {
    id: "m-15",
    eventId: "e-football-001",
    round: "third_place",
    roundLabel: "3rd Place Playoff",
    matchNumber: 15,
    teamAId: "team-12",
    teamBId: "team-03",
    scheduledTime: "2026-12-05T13:30:00Z",
    pitchLocation: "SDU Main Stadium Pitch",
    status: "scheduled",
    scoreA: 0,
    scoreB: 0,
    isExtraTime: false,
    isPenaltyShootout: false,
    refereeName: "Mr. Augustine Ikimi",
    matchCoordinatorName: "Engr. Kenneth O",
    phoneOperatorName: "Volunteer Tobi",
  },

  // Grand Final (Match 16)
  {
    id: "m-16",
    eventId: "e-football-001",
    round: "final",
    roundLabel: "Grand Final",
    matchNumber: 16,
    teamAId: "team-01",
    teamBId: "team-02",
    scheduledTime: "2026-12-05T15:30:00Z",
    pitchLocation: "SDU Main Stadium Pitch",
    status: "scheduled",
    scoreA: 0,
    scoreB: 0,
    isExtraTime: false,
    isPenaltyShootout: false,
    refereeName: "Mr. Festus Orovwuje",
    matchCoordinatorName: "Tournament Director",
    phoneOperatorName: "Volunteer Tobi & Volunteer Blessing",
    matchReport: "Championship clash between top seeds Engineering Dynamos and Ozoro City Ballers.",
  },
];

// Seed Marathon Categories & Participants (Without matric)
export const seedRaceCategories: RaceCategory[] = [
  {
    id: "rc-10k",
    eventId: "e-marathon-002",
    name: "10K Campus Elite Challenge",
    distanceKm: 10,
    description: "2 laps around the perimeter of Southern Delta University. Timed competition with cash prizes for top 3 finishers.",
    fee: 3000,
  },
  {
    id: "rc-5k",
    eventId: "e-marathon-002",
    name: "5K Campus Fun Run",
    distanceKm: 5,
    description: "1 lap community course open to all students, staff, and fitness enthusiasts. Finisher certificates and refreshment pack included.",
    fee: 2000,
  },
];

export const seedParticipants: Participant[] = [
  {
    id: "runner-01",
    registrationId: "reg-run-01",
    eventId: "e-marathon-002",
    raceCategoryId: "rc-10k",
    raceCategoryName: "10K Campus Elite Challenge",
    fullName: "Emmanuel Edafe",
    email: "e.edafe@student.sdu.edu.ng",
    phone: "08035559911",
    gender: "male",
    dateOfBirth: "2003-05-14",
    emergencyContactName: "Dr. Godwin Edafe",
    emergencyContactPhone: "08023334455",
    emergencyContactRelationship: "Father",
    medicalNotes: "No known issues",
    tShirtSize: "L",
    bibNumber: "101",
    checkInStatus: true,
    checkInTime: "2026-12-08T06:15:00Z",
    createdAt: "2026-11-05T10:00:00Z",
  },
  {
    id: "runner-02",
    registrationId: "reg-run-02",
    eventId: "e-marathon-002",
    raceCategoryId: "rc-10k",
    raceCategoryName: "10K Campus Elite Challenge",
    fullName: "Blessing Akpomiemie",
    email: "b.akpomiemie@student.sdu.edu.ng",
    phone: "08035559912",
    gender: "female",
    dateOfBirth: "2004-09-22",
    emergencyContactName: "Mrs. Grace Akpomiemie",
    emergencyContactPhone: "08039998877",
    emergencyContactRelationship: "Mother",
    medicalNotes: "Mild asthma; carries personal inhaler",
    tShirtSize: "M",
    bibNumber: "102",
    checkInStatus: true,
    checkInTime: "2026-12-08T06:20:00Z",
    createdAt: "2026-11-05T11:30:00Z",
  },
  {
    id: "runner-03",
    registrationId: "reg-run-03",
    eventId: "e-marathon-002",
    raceCategoryId: "rc-10k",
    raceCategoryName: "10K Campus Elite Challenge",
    fullName: "Chidubem Okafor",
    email: "c.dubem@student.sdu.edu.ng",
    phone: "08035559913",
    gender: "male",
    dateOfBirth: "2002-11-03",
    emergencyContactName: "Pastor Okafor",
    emergencyContactPhone: "08031110022",
    emergencyContactRelationship: "Brother",
    tShirtSize: "XL",
    bibNumber: "103",
    checkInStatus: true,
    checkInTime: "2026-12-08T06:25:00Z",
    createdAt: "2026-11-05T14:10:00Z",
  },
  {
    id: "runner-04",
    registrationId: "reg-run-04",
    eventId: "e-marathon-002",
    raceCategoryId: "rc-5k",
    raceCategoryName: "5K Campus Fun Run",
    fullName: "Favour Enaruna",
    email: "f.enaruna@student.sdu.edu.ng",
    phone: "08035559914",
    gender: "female",
    dateOfBirth: "2004-03-19",
    emergencyContactName: "Joy Enaruna",
    emergencyContactPhone: "08027776655",
    emergencyContactRelationship: "Sister",
    tShirtSize: "S",
    bibNumber: "501",
    checkInStatus: true,
    checkInTime: "2026-12-08T06:30:00Z",
    createdAt: "2026-11-06T09:00:00Z",
  },
  {
    id: "runner-05",
    registrationId: "reg-run-05",
    eventId: "e-marathon-002",
    raceCategoryId: "rc-5k",
    raceCategoryName: "5K Campus Fun Run",
    fullName: "Ochuko Dafiaghor",
    email: "o.dafiaghor@student.sdu.edu.ng",
    phone: "08035559915",
    gender: "male",
    dateOfBirth: "2003-08-11",
    emergencyContactName: "Anthony Dafiaghor",
    emergencyContactPhone: "08036665544",
    emergencyContactRelationship: "Uncle",
    tShirtSize: "L",
    bibNumber: "502",
    checkInStatus: false,
    createdAt: "2026-11-06T10:15:00Z",
  },
];

// Seed Marathon Results
export const seedRaceResults: RaceResult[] = [
  {
    id: "res-01",
    raceCategoryId: "rc-10k",
    participantId: "runner-01",
    participantName: "Emmanuel Edafe",
    bibNumber: "101",
    gunTimeSeconds: 2184,
    chipTimeSeconds: 2180,
    finishingPosition: 1,
    status: "finished",
    notes: "Course record for inaugural SDU 10K",
  },
  {
    id: "res-02",
    raceCategoryId: "rc-10k",
    participantId: "runner-03",
    participantName: "Chidubem Okafor",
    bibNumber: "103",
    gunTimeSeconds: 2315,
    chipTimeSeconds: 2311,
    finishingPosition: 2,
    status: "finished",
  },
  {
    id: "res-03",
    raceCategoryId: "rc-10k",
    participantId: "runner-02",
    participantName: "Blessing Akpomiemie",
    bibNumber: "102",
    gunTimeSeconds: 2472,
    chipTimeSeconds: 2468,
    finishingPosition: 3,
    status: "finished",
    notes: "Top female finisher",
  },
];

// Seed Payments
export const seedPayments: Payment[] = [
  {
    id: "pay-01",
    registrationId: "reg-01",
    eventId: "e-football-001",
    payerName: "Chinedu Okafor",
    transferDate: "2026-11-01",
    amount: 10000,
    transferReference: "FBN-TRF-2026-89102",
    status: "verified",
    verifiedBy: "admin-finance",
    verifiedByName: "Finance Officer",
    verifiedAt: "2026-11-01T14:00:00Z",
    createdAt: "2026-11-01T10:30:00Z",
  },
  {
    id: "pay-02",
    registrationId: "reg-02",
    eventId: "e-football-001",
    payerName: "Eseosa Ighodaro",
    transferDate: "2026-11-01",
    amount: 10000,
    transferReference: "GTB-TRF-2026-11442",
    status: "verified",
    verifiedBy: "admin-finance",
    verifiedByName: "Finance Officer",
    verifiedAt: "2026-11-01T15:00:00Z",
    createdAt: "2026-11-01T11:45:00Z",
  },
];

// Seed Media Assets
export const seedMediaAssets: MediaAsset[] = [
  {
    id: "media-01",
    eventId: "e-football-001",
    mediaType: "highlight",
    title: "Round of 16 Opening Goal Highlight",
    caption: "Low strike into corner from sideline phone recording.",
    url: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80",
    platform: "instagram",
    embedCode: "https://instagram.com",
    isFeatured: true,
    createdAt: "2026-11-20T17:00:00Z",
  },
  {
    id: "media-02",
    eventId: "e-football-001",
    mediaType: "video",
    title: "Penalty Shootout Decider",
    caption: "Sudden death spot kicks in tie-break.",
    url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
    platform: "tiktok",
    embedCode: "https://tiktok.com",
    isFeatured: true,
    createdAt: "2026-11-20T18:30:00Z",
  },
];

// Seed Announcements
export const seedAnnouncements: Announcement[] = [
  {
    id: "ann-01",
    eventId: "e-football-001",
    title: "Official 16-Team Random Draw Complete & Fixtures Published",
    slug: "draw-complete-fixtures-published",
    category: "fixtures",
    content: "The Tournament Committee has concluded the random draw. All 16 registered teams are placed in the single-elimination bracket.",
    isPinned: true,
    publishedAt: "2026-11-19T18:00:00Z",
  },
  {
    id: "ann-02",
    eventId: "e-football-001",
    title: "Reminder: Card Fines & 15-Minute Walkover Grace Period",
    slug: "disciplinary-rules-and-grace-period",
    category: "disciplinary",
    content: "Captains: Yellow cards carry a ₦1,000 fine; Red cards carry ₦3,000 + 1-match ban. Teams must report ready within 15 minutes of scheduled kickoff.",
    isPinned: true,
    publishedAt: "2026-11-19T20:00:00Z",
  },
];

// Seed Audit Logs
export const seedAuditLogs: AuditLog[] = [
  {
    id: "log-01",
    adminUserId: "admin-finance",
    adminName: "Finance Officer",
    action: "VERIFY_PAYMENT",
    entityType: "payment",
    entityId: "pay-01",
    details: "Verified ₦10,000 transfer from Chinedu Okafor (Engineering Dynamos).",
    createdAt: "2026-11-01T14:00:00Z",
  },
];

class WSCStore {
  private events: WSCEvent[] = [...seedEvents];
  private teams: Team[] = [...seedTeams];
  private matches: Match[] = [...seedMatches];
  private raceCategories: RaceCategory[] = [...seedRaceCategories];
  private participants: Participant[] = [...seedParticipants];
  private raceResults: RaceResult[] = [...seedRaceResults];
  private payments: Payment[] = [...seedPayments];
  private mediaAssets: MediaAsset[] = [...seedMediaAssets];
  private announcements: Announcement[] = [...seedAnnouncements];
  private auditLogs: AuditLog[] = [...seedAuditLogs];
  private captainAccounts: CaptainAccount[] = [
    {
      id: "capt-01",
      email: "c.okafor@student.sdu.edu.ng",
      fullName: "Chinedu Okafor",
      phone: "08031112233",
      teamId: "team-01",
      createdAt: "2026-11-01T10:00:00Z",
    }
  ];

  // Events & Dynamic Parameters
  getEvents() { return this.events; }
  getEventById(id: string) { return this.events.find(e => e.id === id || e.slug === id); }
  
  updateEvent(updated: Partial<WSCEvent> & { id: string }) {
    this.events = this.events.map(e => e.id === updated.id ? { ...e, ...updated } : e);
    return this.getEventById(updated.id);
  }

  updateEventTournamentParameters(eventId: string, params: {
    maxTeams: number;
    squadSize: number;
    playersOnPitch: number;
    prizePoolTotal: number;
    prizeFirst: number;
    prizeSecond: number;
    prizeThird: number;
    halfDurationMinutes: number;
    gracePeriodMinutes: number;
    yellowCardFine: number;
    redCardFine: number;
  }) {
    const event = this.getEventById(eventId);
    if (!event) return null;
    return this.updateEvent({
      id: event.id,
      ...params,
    });
  }

  // Teams & Captains & Invite Code System
  getTeams(eventId?: string) {
    if (eventId) return this.teams.filter(t => t.eventId === eventId);
    return this.teams;
  }
  getTeamById(id: string) { return this.teams.find(t => t.id === id); }
  getTeamByInviteCode(code: string) {
    const clean = code.trim().toUpperCase();
    return this.teams.find(t => t.inviteCode.toUpperCase() === clean);
  }

  addTeam(newTeam: Team) {
    this.teams.push(newTeam);
    return newTeam;
  }

  registerCaptainAccount(account: CaptainAccount) {
    this.captainAccounts.push(account);
    return account;
  }

  getCaptainByEmail(email: string) {
    return this.captainAccounts.find(c => c.email.toLowerCase() === email.toLowerCase().trim());
  }

  joinTeamWithInviteCode(inviteCode: string, player: {
    fullName: string;
    email: string;
    phone: string;
    jerseyNumber: number;
  }): { success: boolean; error?: string; player?: TeamPlayer } {
    const team = this.getTeamByInviteCode(inviteCode);
    if (!team) {
      return { success: false, error: "Invalid invitation code. Please check with your team captain." };
    }

    const event = this.getEventById(team.eventId);
    const maxSquad = event?.squadSize || 7;

    if (team.players.length >= maxSquad) {
      return { success: false, error: `Team roster is full (maximum ${maxSquad} players registered).` };
    }

    const emailClean = player.email.trim().toLowerCase();
    const phoneClean = player.phone.trim();

    // Check duplicate email across teams
    const allPlayers = this.teams.flatMap(t => t.players);
    if (allPlayers.some(p => p.email.toLowerCase() === emailClean)) {
      return { success: false, error: "A player with this email is already registered on a team." };
    }

    const newTeamPlayer: TeamPlayer = {
      id: `p-${Date.now()}`,
      fullName: player.fullName.trim(),
      email: emailClean,
      phone: phoneClean,
      jerseyNumber: player.jerseyNumber,
      isCaptain: false,
      verificationStatus: "verified",
      joinedViaInvite: true,
    };

    team.players.push(newTeamPlayer);
    return { success: true, player: newTeamPlayer };
  }

  updateTeamStatus(teamId: string, status: Team["status"]) {
    this.teams = this.teams.map(t => t.id === teamId ? { ...t, status } : t);
  }

  // Matches
  getMatches(eventId?: string) {
    if (eventId) return this.matches.filter(m => m.eventId === eventId);
    return this.matches;
  }
  getMatchById(id: string) { return this.matches.find(m => m.id === id); }
  updateMatch(updatedMatch: Partial<Match> & { id: string }) {
    this.matches = this.matches.map(m => m.id === updatedMatch.id ? { ...m, ...updatedMatch } : m);
    return this.getMatchById(updatedMatch.id);
  }
  addMatchEvent(matchId: string, event: Omit<import("@/types").MatchEvent, "id" | "matchId" | "createdAt">) {
    const match = this.getMatchById(matchId);
    if (!match) return null;
    const newEvent = {
      ...event,
      id: `ev-${Date.now()}`,
      matchId,
      createdAt: new Date().toISOString(),
    };
    if (!match.events) match.events = [];
    match.events.push(newEvent);
    return newEvent;
  }

  // Marathon
  getRaceCategories(eventId?: string) {
    if (eventId) return this.raceCategories.filter(r => r.eventId === eventId);
    return this.raceCategories;
  }
  getParticipants(eventId?: string) {
    if (eventId) return this.participants.filter(p => p.eventId === eventId);
    return this.participants;
  }
  addParticipant(participant: Participant) {
    this.participants.push(participant);
    return participant;
  }
  updateParticipantCheckIn(participantId: string, checkIn: boolean) {
    this.participants = this.participants.map(p => 
      p.id === participantId 
        ? { ...p, checkInStatus: checkIn, checkInTime: checkIn ? new Date().toISOString() : undefined } 
        : p
    );
  }
  getRaceResults(raceCategoryId?: string) {
    if (raceCategoryId) return this.raceResults.filter(r => r.raceCategoryId === raceCategoryId);
    return this.raceResults;
  }
  addRaceResult(result: RaceResult) {
    this.raceResults.push(result);
    return result;
  }

  // Payments
  getPayments(eventId?: string) {
    if (eventId) return this.payments.filter(p => p.eventId === eventId);
    return this.payments;
  }
  addPayment(payment: Payment) {
    this.payments.unshift(payment);
    return payment;
  }
  verifyPayment(paymentId: string, verifiedByName: string, approved: boolean, rejectionReason?: string) {
    this.payments = this.payments.map(p => {
      if (p.id === paymentId) {
        return {
          ...p,
          status: approved ? "verified" : "rejected",
          verifiedByName,
          verifiedAt: new Date().toISOString(),
          rejectionReason: approved ? undefined : rejectionReason,
        };
      }
      return p;
    });

    const payment = this.payments.find(p => p.id === paymentId);
    if (payment && approved) {
      const team = this.teams.find(t => t.registrationId === payment.registrationId);
      if (team) {
        this.updateTeamStatus(team.id, "confirmed");
      }
    }
  }

  // Media
  getMedia(eventId?: string) {
    if (eventId) return this.mediaAssets.filter(m => !m.eventId || m.eventId === eventId);
    return this.mediaAssets;
  }
  addMedia(media: MediaAsset) {
    this.mediaAssets.unshift(media);
    return media;
  }

  // Announcements
  getAnnouncements(eventId?: string) {
    if (eventId) return this.announcements.filter(a => !a.eventId || a.eventId === eventId);
    return this.announcements;
  }
  addAnnouncement(announcement: Announcement) {
    this.announcements.unshift(announcement);
    return announcement;
  }

  // Audit Logs
  getAuditLogs() { return this.auditLogs; }
  addAuditLog(log: Omit<AuditLog, "id" | "createdAt">) {
    const newLog: AuditLog = {
      ...log,
      id: `log-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.auditLogs.unshift(newLog);
    return newLog;
  }
}

export const store = new WSCStore();
