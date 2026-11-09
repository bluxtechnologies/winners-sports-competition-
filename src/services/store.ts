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
  EventRegistration 
} from "@/types";

// Seed Events
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
    prizePoolTotal: 80000,
    prizeFirst: 50000,
    prizeSecond: 20000,
    prizeThird: 10000,
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
    prizePoolTotal: 50000,
    prizeFirst: 30000,
    prizeSecond: 15000,
    prizeThird: 5000,
    rulesSummary: "Official bib number required. Water stations every 2.5km. Emergency medical staff on-site. Valid Southern Delta University matriculation ID required for student podium eligibility.",
    bannerUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80",
    contactEmail: "marathon@winners-sports.org",
    contactPhone: "+234 803 765 4321",
    confirmedCount: 42,
  },
];

// Seed Teams (16 Teams for WFC)
export const seedTeams: Team[] = [
  {
    id: "team-01",
    registrationId: "reg-01",
    eventId: "e-football-001",
    name: "Engineering Dynamos",
    shortCode: "ENG",
    departmentOrHall: "Faculty of Engineering",
    captainName: "Chinedu Okafor",
    captainEmail: "c.okafor@student.sdu.edu.ng",
    captainPhone: "08031112233",
    captainMatric: "SDU/ENG/2022/1042",
    seedNumber: 1,
    bracketPosition: 1,
    status: "confirmed",
    createdAt: "2026-11-01T10:00:00Z",
    players: [
      { id: "p-01", fullName: "Chinedu Okafor", email: "c.okafor@student.sdu.edu.ng", phone: "08031112233", matricNumber: "SDU/ENG/2022/1042", jerseyNumber: 10, isCaptain: true, verificationStatus: "verified" },
      { id: "p-02", fullName: "Emeka Nwosu", email: "e.nwosu@student.sdu.edu.ng", phone: "08031112234", matricNumber: "SDU/ENG/2022/1043", jerseyNumber: 7, isCaptain: false, verificationStatus: "verified" },
      { id: "p-03", fullName: "Oviemo Akpan", email: "o.akpan@student.sdu.edu.ng", phone: "08031112235", matricNumber: "SDU/ENG/2023/1102", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
      { id: "p-04", fullName: "Tariere Brisibe", email: "t.brisibe@student.sdu.edu.ng", phone: "08031112236", matricNumber: "SDU/ENG/2021/0954", jerseyNumber: 8, isCaptain: false, verificationStatus: "verified" },
      { id: "p-05", fullName: "Kelvin Osagie", email: "k.osagie@student.sdu.edu.ng", phone: "08031112237", matricNumber: "SDU/ENG/2023/1201", jerseyNumber: 9, isCaptain: false, verificationStatus: "verified" },
      { id: "p-06", fullName: "Blessing Idowu", email: "b.idowu@student.sdu.edu.ng", phone: "08031112238", matricNumber: "SDU/ENG/2022/1188", jerseyNumber: 2, isCaptain: false, verificationStatus: "verified" },
      { id: "p-07", fullName: "Victor Efe", email: "v.efe@student.sdu.edu.ng", phone: "08031112239", matricNumber: "SDU/ENG/2024/1310", jerseyNumber: 11, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-02",
    registrationId: "reg-02",
    eventId: "e-football-001",
    name: "Ozoro City Ballers",
    shortCode: "OCB",
    departmentOrHall: "Faculty of Management Science",
    captainName: "Eseosa Ighodaro",
    captainEmail: "e.ighodaro@student.sdu.edu.ng",
    captainPhone: "08032223344",
    captainMatric: "SDU/MGT/2021/0812",
    seedNumber: 2,
    bracketPosition: 2,
    status: "confirmed",
    createdAt: "2026-11-01T11:15:00Z",
    players: [
      { id: "p-08", fullName: "Eseosa Ighodaro", email: "e.ighodaro@student.sdu.edu.ng", phone: "08032223344", matricNumber: "SDU/MGT/2021/0812", jerseyNumber: 9, isCaptain: true, verificationStatus: "verified" },
      { id: "p-09", fullName: "Samuel Agbaje", email: "s.agbaje@student.sdu.edu.ng", phone: "08032223345", matricNumber: "SDU/MGT/2022/0944", jerseyNumber: 10, isCaptain: false, verificationStatus: "verified" },
      { id: "p-10", fullName: "Collins Uche", email: "c.uche@student.sdu.edu.ng", phone: "08032223346", matricNumber: "SDU/MGT/2023/1021", jerseyNumber: 5, isCaptain: false, verificationStatus: "verified" },
      { id: "p-11", fullName: "Princewill Onu", email: "p.onu@student.sdu.edu.ng", phone: "08032223347", matricNumber: "SDU/MGT/2021/0789", jerseyNumber: 3, isCaptain: false, verificationStatus: "verified" },
      { id: "p-12", fullName: "Kevwe Omovie", email: "k.omovie@student.sdu.edu.ng", phone: "08032223348", matricNumber: "SDU/MGT/2023/1110", jerseyNumber: 7, isCaptain: false, verificationStatus: "verified" },
      { id: "p-13", fullName: "Gideon Maduka", email: "g.maduka@student.sdu.edu.ng", phone: "08032223349", matricNumber: "SDU/MGT/2022/0991", jerseyNumber: 14, isCaptain: false, verificationStatus: "verified" },
      { id: "p-14", fullName: "Osasere Enabulele", email: "o.enabulele@student.sdu.edu.ng", phone: "08032223350", matricNumber: "SDU/MGT/2024/1255", jerseyNumber: 8, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-03",
    registrationId: "reg-03",
    eventId: "e-football-001",
    name: "Delta Falcons FC",
    shortCode: "DFF",
    departmentOrHall: "Faculty of Science",
    captainName: "Precious Oghenekaro",
    captainEmail: "p.oghene@student.sdu.edu.ng",
    captainPhone: "08033334455",
    captainMatric: "SDU/SCI/2022/0541",
    seedNumber: 3,
    bracketPosition: 3,
    status: "confirmed",
    createdAt: "2026-11-01T12:00:00Z",
    players: [
      { id: "p-15", fullName: "Precious Oghenekaro", email: "p.oghene@student.sdu.edu.ng", phone: "08033334455", matricNumber: "SDU/SCI/2022/0541", jerseyNumber: 10, isCaptain: true, verificationStatus: "verified" },
      { id: "p-16", fullName: "Godstime Efetobor", email: "g.efetobor@student.sdu.edu.ng", phone: "08033334456", matricNumber: "SDU/SCI/2022/0542", jerseyNumber: 7, isCaptain: false, verificationStatus: "verified" },
      { id: "p-17", fullName: "Harrison Efe", email: "h.efe@student.sdu.edu.ng", phone: "08033334457", matricNumber: "SDU/SCI/2023/0677", jerseyNumber: 6, isCaptain: false, verificationStatus: "verified" },
      { id: "p-18", fullName: "Tega Omoraka", email: "t.omoraka@student.sdu.edu.ng", phone: "08033334458", matricNumber: "SDU/SCI/2021/0430", jerseyNumber: 11, isCaptain: false, verificationStatus: "verified" },
      { id: "p-19", fullName: "Favour Momoh", email: "f.momoh@student.sdu.edu.ng", phone: "08033334459", matricNumber: "SDU/SCI/2023/0710", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
      { id: "p-20", fullName: "David Ubogun", email: "d.ubogun@student.sdu.edu.ng", phone: "08033334460", matricNumber: "SDU/SCI/2022/0599", jerseyNumber: 8, isCaptain: false, verificationStatus: "verified" },
      { id: "p-21", fullName: "Justice Edafe", email: "j.edafe@student.sdu.edu.ng", phone: "08033334461", matricNumber: "SDU/SCI/2024/0822", jerseyNumber: 2, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-04",
    registrationId: "reg-04",
    eventId: "e-football-001",
    name: "Campus Titans",
    shortCode: "CTT",
    departmentOrHall: "Hostel B & C Block",
    captainName: "Daniel Okotete",
    captainEmail: "d.okotete@student.sdu.edu.ng",
    captainPhone: "08034445566",
    captainMatric: "SDU/ENV/2022/0321",
    seedNumber: 4,
    bracketPosition: 4,
    status: "confirmed",
    createdAt: "2026-11-01T13:30:00Z",
    players: [
      { id: "p-22", fullName: "Daniel Okotete", email: "d.okotete@student.sdu.edu.ng", phone: "08034445566", matricNumber: "SDU/ENV/2022/0321", jerseyNumber: 8, isCaptain: true, verificationStatus: "verified" },
      { id: "p-23", fullName: "Marvellous Odjugo", email: "m.odjugo@student.sdu.edu.ng", phone: "08034445567", matricNumber: "SDU/ENV/2022/0322", jerseyNumber: 10, isCaptain: false, verificationStatus: "verified" },
      { id: "p-24", fullName: "Igho Atumah", email: "i.atumah@student.sdu.edu.ng", phone: "08034445568", matricNumber: "SDU/ENV/2023/0401", jerseyNumber: 5, isCaptain: false, verificationStatus: "verified" },
      { id: "p-25", fullName: "Ogagaoghene Ikpasa", email: "o.ikpasa@student.sdu.edu.ng", phone: "08034445569", matricNumber: "SDU/ENV/2021/0219", jerseyNumber: 9, isCaptain: false, verificationStatus: "verified" },
      { id: "p-26", fullName: "Kevwe Okiemute", email: "k.okiemute@student.sdu.edu.ng", phone: "08034445570", matricNumber: "SDU/ENV/2023/0488", jerseyNumber: 3, isCaptain: false, verificationStatus: "verified" },
      { id: "p-27", fullName: "Prosper Anigboro", email: "p.anigboro@student.sdu.edu.ng", phone: "08034445571", matricNumber: "SDU/ENV/2022/0355", jerseyNumber: 7, isCaptain: false, verificationStatus: "verified" },
      { id: "p-28", fullName: "Ochuko Enarhire", email: "o.enarhire@student.sdu.edu.ng", phone: "08034445572", matricNumber: "SDU/ENV/2024/0590", jerseyNumber: 11, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-05",
    registrationId: "reg-05",
    eventId: "e-football-001",
    name: "Agro All-Stars",
    shortCode: "AAS",
    departmentOrHall: "Faculty of Agriculture",
    captainName: "Faithful Igbinosa",
    captainEmail: "f.igbinosa@student.sdu.edu.ng",
    captainPhone: "08035556677",
    captainMatric: "SDU/AGR/2022/0111",
    seedNumber: 5,
    bracketPosition: 5,
    status: "confirmed",
    createdAt: "2026-11-02T09:00:00Z",
    players: [
      { id: "p-29", fullName: "Faithful Igbinosa", email: "f.igbinosa@student.sdu.edu.ng", phone: "08035556677", matricNumber: "SDU/AGR/2022/0111", jerseyNumber: 7, isCaptain: true, verificationStatus: "verified" },
      { id: "p-30", fullName: "Paul Erhabor", email: "p.erhabor@student.sdu.edu.ng", phone: "08035556678", matricNumber: "SDU/AGR/2022/0112", jerseyNumber: 10, isCaptain: false, verificationStatus: "verified" },
      { id: "p-31", fullName: "Jerry Osakwe", email: "j.osakwe@student.sdu.edu.ng", phone: "08035556679", matricNumber: "SDU/AGR/2023/0189", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
      { id: "p-32", fullName: "Solomon Eguono", email: "s.eguono@student.sdu.edu.ng", phone: "08035556680", matricNumber: "SDU/AGR/2021/0088", jerseyNumber: 8, isCaptain: false, verificationStatus: "verified" },
      { id: "p-33", fullName: "Moses Orhorhoro", email: "m.orhorhoro@student.sdu.edu.ng", phone: "08035556681", matricNumber: "SDU/AGR/2023/0210", jerseyNumber: 9, isCaptain: false, verificationStatus: "verified" },
      { id: "p-34", fullName: "Peter Okandeji", email: "p.okandeji@student.sdu.edu.ng", phone: "08035556682", matricNumber: "SDU/AGR/2022/0144", jerseyNumber: 5, isCaptain: false, verificationStatus: "verified" },
      { id: "p-35", fullName: "Austin Enakpodia", email: "a.enakpodia@student.sdu.edu.ng", phone: "08035556683", matricNumber: "SDU/AGR/2024/0299", jerseyNumber: 11, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-06",
    registrationId: "reg-06",
    eventId: "e-football-001",
    name: "Ozoro Spartans",
    shortCode: "OSP",
    departmentOrHall: "Faculty of Social Sciences",
    captainName: "Ejiro Onome",
    captainEmail: "e.onome@student.sdu.edu.ng",
    captainPhone: "08036667788",
    captainMatric: "SDU/SOC/2022/0661",
    seedNumber: 6,
    bracketPosition: 6,
    status: "confirmed",
    createdAt: "2026-11-02T10:30:00Z",
    players: [
      { id: "p-36", fullName: "Ejiro Onome", email: "e.onome@student.sdu.edu.ng", phone: "08036667788", matricNumber: "SDU/SOC/2022/0661", jerseyNumber: 10, isCaptain: true, verificationStatus: "verified" },
      { id: "p-37", fullName: "Akpevwe Edewor", email: "a.edewor@student.sdu.edu.ng", phone: "08036667789", matricNumber: "SDU/SOC/2022/0662", jerseyNumber: 9, isCaptain: false, verificationStatus: "verified" },
      { id: "p-38", fullName: "Stanley Uvwie", email: "s.uvwie@student.sdu.edu.ng", phone: "08036667790", matricNumber: "SDU/SOC/2023/0740", jerseyNumber: 6, isCaptain: false, verificationStatus: "verified" },
      { id: "p-39", fullName: "Sunday Ogaga", email: "s.ogaga@student.sdu.edu.ng", phone: "08036667791", matricNumber: "SDU/SOC/2021/0590", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
      { id: "p-40", fullName: "Efe Agbor", email: "e.agbor@student.sdu.edu.ng", phone: "08036667792", matricNumber: "SDU/SOC/2023/0795", jerseyNumber: 8, isCaptain: false, verificationStatus: "verified" },
      { id: "p-41", fullName: "Clifford Ibru", email: "c.ibru@student.sdu.edu.ng", phone: "08036667793", matricNumber: "SDU/SOC/2022/0680", jerseyNumber: 2, isCaptain: false, verificationStatus: "verified" },
      { id: "p-42", fullName: "Richard Obaro", email: "r.obaro@student.sdu.edu.ng", phone: "08036667794", matricNumber: "SDU/SOC/2024/0912", jerseyNumber: 14, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-07",
    registrationId: "reg-07",
    eventId: "e-football-001",
    name: "Red Devils SDU",
    shortCode: "RDS",
    departmentOrHall: "Computer Science Dept",
    captainName: "Osita Eze",
    captainEmail: "o.eze@student.sdu.edu.ng",
    captainPhone: "08037778899",
    captainMatric: "SDU/CSC/2022/0201",
    seedNumber: 7,
    bracketPosition: 7,
    status: "confirmed",
    createdAt: "2026-11-02T11:45:00Z",
    players: [
      { id: "p-43", fullName: "Osita Eze", email: "o.eze@student.sdu.edu.ng", phone: "08037778899", matricNumber: "SDU/CSC/2022/0201", jerseyNumber: 11, isCaptain: true, verificationStatus: "verified" },
      { id: "p-44", fullName: "Chukwudi Obi", email: "c.obi@student.sdu.edu.ng", phone: "08037778900", matricNumber: "SDU/CSC/2022/0202", jerseyNumber: 10, isCaptain: false, verificationStatus: "verified" },
      { id: "p-45", fullName: "Buchi Nnamdi", email: "b.nnamdi@student.sdu.edu.ng", phone: "08037778901", matricNumber: "SDU/CSC/2023/0288", jerseyNumber: 7, isCaptain: false, verificationStatus: "verified" },
      { id: "p-46", fullName: "Tochukwu Kalu", email: "t.kalu@student.sdu.edu.ng", phone: "08037778902", matricNumber: "SDU/CSC/2021/0177", jerseyNumber: 3, isCaptain: false, verificationStatus: "verified" },
      { id: "p-47", fullName: "Somtochukwu Ilodigwe", email: "s.ilodigwe@student.sdu.edu.ng", phone: "08037778903", matricNumber: "SDU/CSC/2023/0312", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
      { id: "p-48", fullName: "Nonso Madueke", email: "n.madueke@student.sdu.edu.ng", phone: "08037778904", matricNumber: "SDU/CSC/2022/0244", jerseyNumber: 8, isCaptain: false, verificationStatus: "verified" },
      { id: "p-49", fullName: "Ifeanyi Anyanwu", email: "i.anyanwu@student.sdu.edu.ng", phone: "08037778905", matricNumber: "SDU/CSC/2024/0390", jerseyNumber: 5, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-08",
    registrationId: "reg-08",
    eventId: "e-football-001",
    name: "Golden Strikers",
    shortCode: "GST",
    departmentOrHall: "Faculty of Education",
    captainName: "Komeh Ediri",
    captainEmail: "k.ediri@student.sdu.edu.ng",
    captainPhone: "08038889900",
    captainMatric: "SDU/EDU/2022/0411",
    seedNumber: 8,
    bracketPosition: 8,
    status: "confirmed",
    createdAt: "2026-11-02T13:00:00Z",
    players: [
      { id: "p-50", fullName: "Komeh Ediri", email: "k.ediri@student.sdu.edu.ng", phone: "08038889900", matricNumber: "SDU/EDU/2022/0411", jerseyNumber: 9, isCaptain: true, verificationStatus: "verified" },
      { id: "p-51", fullName: "Blessing Igbu", email: "b.igbu@student.sdu.edu.ng", phone: "08038889901", matricNumber: "SDU/EDU/2022/0412", jerseyNumber: 7, isCaptain: false, verificationStatus: "verified" },
      { id: "p-52", fullName: "Oghenerukevwe Efe", email: "o.rukevwe@student.sdu.edu.ng", phone: "08038889902", matricNumber: "SDU/EDU/2023/0488", jerseyNumber: 10, isCaptain: false, verificationStatus: "verified" },
      { id: "p-53", fullName: "Oghenetega Clark", email: "o.clark@student.sdu.edu.ng", phone: "08038889903", matricNumber: "SDU/EDU/2021/0355", jerseyNumber: 5, isCaptain: false, verificationStatus: "verified" },
      { id: "p-54", fullName: "Onoriode Okoloko", email: "o.okoloko@student.sdu.edu.ng", phone: "08038889904", matricNumber: "SDU/EDU/2023/0521", jerseyNumber: 2, isCaptain: false, verificationStatus: "verified" },
      { id: "p-55", fullName: "Mudiaga Oweh", email: "m.oweh@student.sdu.edu.ng", phone: "08038889905", matricNumber: "SDU/EDU/2022/0430", jerseyNumber: 8, isCaptain: false, verificationStatus: "verified" },
      { id: "p-56", fullName: "Tosan Wilkie", email: "t.wilkie@student.sdu.edu.ng", phone: "08038889906", matricNumber: "SDU/EDU/2024/0599", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-09",
    registrationId: "reg-09",
    eventId: "e-football-001",
    name: "Phoenix Knights",
    shortCode: "PHK",
    departmentOrHall: "Faculty of Law & Humanities",
    captainName: "Toluwani Adeyemi",
    captainEmail: "t.adeyemi@student.sdu.edu.ng",
    captainPhone: "08039990011",
    captainMatric: "SDU/LAW/2022/0122",
    seedNumber: 9,
    bracketPosition: 9,
    status: "confirmed",
    createdAt: "2026-11-03T09:30:00Z",
    players: [
      { id: "p-57", fullName: "Toluwani Adeyemi", email: "t.adeyemi@student.sdu.edu.ng", phone: "08039990011", matricNumber: "SDU/LAW/2022/0122", jerseyNumber: 10, isCaptain: true, verificationStatus: "verified" },
      { id: "p-58", fullName: "Femi Falana", email: "f.falana@student.sdu.edu.ng", phone: "08039990012", matricNumber: "SDU/LAW/2022/0123", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
      { id: "p-59", fullName: "Kunle Ajayi", email: "k.ajayi@student.sdu.edu.ng", phone: "08039990013", matricNumber: "SDU/LAW/2023/0201", jerseyNumber: 8, isCaptain: false, verificationStatus: "verified" },
      { id: "p-60", fullName: "Damilola Ojo", email: "d.ojo@student.sdu.edu.ng", phone: "08039990014", matricNumber: "SDU/LAW/2021/0099", jerseyNumber: 7, isCaptain: false, verificationStatus: "verified" },
      { id: "p-61", fullName: "Seyi Makinde", email: "s.makinde@student.sdu.edu.ng", phone: "08039990015", matricNumber: "SDU/LAW/2023/0233", jerseyNumber: 9, isCaptain: false, verificationStatus: "verified" },
      { id: "p-62", fullName: "Bayo Olatunji", email: "b.olatunji@student.sdu.edu.ng", phone: "08039990016", matricNumber: "SDU/LAW/2022/0150", jerseyNumber: 3, isCaptain: false, verificationStatus: "verified" },
      { id: "p-63", fullName: "Segun Popoola", email: "s.popoola@student.sdu.edu.ng", phone: "08039990017", matricNumber: "SDU/LAW/2024/0290", jerseyNumber: 2, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-10",
    registrationId: "reg-10",
    eventId: "e-football-001",
    name: "Thunderbolts United",
    shortCode: "TBU",
    departmentOrHall: "Electrical Engineering",
    captainName: "Eromosele Akhere",
    captainEmail: "e.akhere@student.sdu.edu.ng",
    captainPhone: "08030001122",
    captainMatric: "SDU/EEE/2022/0304",
    seedNumber: 10,
    bracketPosition: 10,
    status: "confirmed",
    createdAt: "2026-11-03T11:00:00Z",
    players: [
      { id: "p-64", fullName: "Eromosele Akhere", email: "e.akhere@student.sdu.edu.ng", phone: "08030001122", matricNumber: "SDU/EEE/2022/0304", jerseyNumber: 7, isCaptain: true, verificationStatus: "verified" },
      { id: "p-65", fullName: "Osaro Igbinedion", email: "o.igbinedion@student.sdu.edu.ng", phone: "08030001123", matricNumber: "SDU/EEE/2022/0305", jerseyNumber: 10, isCaptain: false, verificationStatus: "verified" },
      { id: "p-66", fullName: "Idahosa Omoigui", email: "i.omoigui@student.sdu.edu.ng", phone: "08030001124", matricNumber: "SDU/EEE/2023/0399", jerseyNumber: 6, isCaptain: false, verificationStatus: "verified" },
      { id: "p-67", fullName: "Uyi Aghahowa", email: "u.aghahowa@student.sdu.edu.ng", phone: "08030001125", matricNumber: "SDU/EEE/2021/0244", jerseyNumber: 9, isCaptain: false, verificationStatus: "verified" },
      { id: "p-68", fullName: "Nosakhare Idehen", email: "n.idehen@student.sdu.edu.ng", phone: "08030001126", matricNumber: "SDU/EEE/2023/0440", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
      { id: "p-69", fullName: "Efe Omoregie", email: "e.omoregie@student.sdu.edu.ng", phone: "08030001127", matricNumber: "SDU/EEE/2022/0329", jerseyNumber: 5, isCaptain: false, verificationStatus: "verified" },
      { id: "p-70", fullName: "Efosa Akenzua", email: "e.akenzua@student.sdu.edu.ng", phone: "08030001128", matricNumber: "SDU/EEE/2024/0512", jerseyNumber: 11, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-11",
    registrationId: "reg-11",
    eventId: "e-football-001",
    name: "Ozoro All-Stars",
    shortCode: "OAS",
    departmentOrHall: "Mass Communication",
    captainName: "Tarila Ebikeme",
    captainEmail: "t.ebikeme@student.sdu.edu.ng",
    captainPhone: "08031234567",
    captainMatric: "SDU/MAC/2022/0155",
    seedNumber: 11,
    bracketPosition: 11,
    status: "confirmed",
    createdAt: "2026-11-03T14:15:00Z",
    players: [
      { id: "p-71", fullName: "Tarila Ebikeme", email: "t.ebikeme@student.sdu.edu.ng", phone: "08031234567", matricNumber: "SDU/MAC/2022/0155", jerseyNumber: 10, isCaptain: true, verificationStatus: "verified" },
      { id: "p-72", fullName: "Ebipade Doubra", email: "e.doubra@student.sdu.edu.ng", phone: "08031234568", matricNumber: "SDU/MAC/2022/0156", jerseyNumber: 9, isCaptain: false, verificationStatus: "verified" },
      { id: "p-73", fullName: "Preye Timipre", email: "p.timipre@student.sdu.edu.ng", phone: "08031234569", matricNumber: "SDU/MAC/2023/0244", jerseyNumber: 7, isCaptain: false, verificationStatus: "verified" },
      { id: "p-74", fullName: "Ebiere Alabrah", email: "e.alabrah@student.sdu.edu.ng", phone: "08031234570", matricNumber: "SDU/MAC/2021/0109", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
      { id: "p-75", fullName: "Perewari Dorgu", email: "p.dorgu@student.sdu.edu.ng", phone: "08031234571", matricNumber: "SDU/MAC/2023/0270", jerseyNumber: 8, isCaptain: false, verificationStatus: "verified" },
      { id: "p-76", fullName: "Tombra Ogidi", email: "t.ogidi@student.sdu.edu.ng", phone: "08031234572", matricNumber: "SDU/MAC/2022/0178", jerseyNumber: 2, isCaptain: false, verificationStatus: "verified" },
      { id: "p-77", fullName: "Kurotimi George", email: "k.george@student.sdu.edu.ng", phone: "08031234573", matricNumber: "SDU/MAC/2024/0350", jerseyNumber: 5, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-12",
    registrationId: "reg-12",
    eventId: "e-football-001",
    name: "SDU Invincibles",
    shortCode: "SDI",
    departmentOrHall: "Accounting & Finance",
    captainName: "Ubong Bassey",
    captainEmail: "u.bassey@student.sdu.edu.ng",
    captainPhone: "08032345678",
    captainMatric: "SDU/ACC/2022/0331",
    seedNumber: 12,
    bracketPosition: 12,
    status: "confirmed",
    createdAt: "2026-11-04T09:00:00Z",
    players: [
      { id: "p-78", fullName: "Ubong Bassey", email: "u.bassey@student.sdu.edu.ng", phone: "08032345678", matricNumber: "SDU/ACC/2022/0331", jerseyNumber: 8, isCaptain: true, verificationStatus: "verified" },
      { id: "p-79", fullName: "Etido Essien", email: "e.essien@student.sdu.edu.ng", phone: "08032345679", matricNumber: "SDU/ACC/2022/0332", jerseyNumber: 11, isCaptain: false, verificationStatus: "verified" },
      { id: "p-80", fullName: "Aniefiok Udoh", email: "a.udoh@student.sdu.edu.ng", phone: "08032345680", matricNumber: "SDU/ACC/2023/0411", jerseyNumber: 10, isCaptain: false, verificationStatus: "verified" },
      { id: "p-81", fullName: "Inemesit Akpan", email: "i.akpan@student.sdu.edu.ng", phone: "08032345681", matricNumber: "SDU/ACC/2021/0255", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
      { id: "p-82", fullName: "Kufre Archibong", email: "k.archibong@student.sdu.edu.ng", phone: "08032345682", matricNumber: "SDU/ACC/2023/0465", jerseyNumber: 7, isCaptain: false, verificationStatus: "verified" },
      { id: "p-83", fullName: "Edidiong Asuquo", email: "e.asuquo@student.sdu.edu.ng", phone: "08032345683", matricNumber: "SDU/ACC/2022/0360", jerseyNumber: 3, isCaptain: false, verificationStatus: "verified" },
      { id: "p-84", fullName: "Nsikan Ekong", email: "n.ekong@student.sdu.edu.ng", phone: "08032345684", matricNumber: "SDU/ACC/2024/0520", jerseyNumber: 6, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-13",
    registrationId: "reg-13",
    eventId: "e-football-001",
    name: "Redeemed Warriors",
    shortCode: "RDW",
    departmentOrHall: "Christian Fellowship Hall",
    captainName: "Ezekiel Agbonlahor",
    captainEmail: "e.agbonlahor@student.sdu.edu.ng",
    captainPhone: "08033456789",
    captainMatric: "SDU/BIO/2022/0088",
    seedNumber: 13,
    bracketPosition: 13,
    status: "confirmed",
    createdAt: "2026-11-04T11:20:00Z",
    players: [
      { id: "p-85", fullName: "Ezekiel Agbonlahor", email: "e.agbonlahor@student.sdu.edu.ng", phone: "08033456789", matricNumber: "SDU/BIO/2022/0088", jerseyNumber: 7, isCaptain: true, verificationStatus: "verified" },
      { id: "p-86", fullName: "Joshua Osemwegie", email: "j.osemwegie@student.sdu.edu.ng", phone: "08033456790", matricNumber: "SDU/BIO/2022/0089", jerseyNumber: 9, isCaptain: false, verificationStatus: "verified" },
      { id: "p-87", fullName: "Caleb Igbinedion", email: "c.igbinedion@student.sdu.edu.ng", phone: "08033456791", matricNumber: "SDU/BIO/2023/0144", jerseyNumber: 10, isCaptain: false, verificationStatus: "verified" },
      { id: "p-88", fullName: "Gideon Ehigiator", email: "g.ehigiator@student.sdu.edu.ng", phone: "08033456792", matricNumber: "SDU/BIO/2021/0060", jerseyNumber: 5, isCaptain: false, verificationStatus: "verified" },
      { id: "p-89", fullName: "Timothy Osahon", email: "t.osahon@student.sdu.edu.ng", phone: "08033456793", matricNumber: "SDU/BIO/2023/0180", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
      { id: "p-90", fullName: "David Izekor", email: "d.izekor@student.sdu.edu.ng", phone: "08033456794", matricNumber: "SDU/BIO/2022/0105", jerseyNumber: 2, isCaptain: false, verificationStatus: "verified" },
      { id: "p-91", fullName: "Nathaniel Osaze", email: "n.osaze@student.sdu.edu.ng", phone: "08033456795", matricNumber: "SDU/BIO/2024/0220", jerseyNumber: 8, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-14",
    registrationId: "reg-14",
    eventId: "e-football-001",
    name: "Kings of Monkey Post",
    shortCode: "KMP",
    departmentOrHall: "Hostel D Block",
    captainName: "Oghenero Ovwigho",
    captainEmail: "o.ovwigho@student.sdu.edu.ng",
    captainPhone: "08034567890",
    captainMatric: "SDU/ENG/2022/1090",
    seedNumber: 14,
    bracketPosition: 14,
    status: "confirmed",
    createdAt: "2026-11-04T13:40:00Z",
    players: [
      { id: "p-92", fullName: "Oghenero Ovwigho", email: "o.ovwigho@student.sdu.edu.ng", phone: "08034567890", matricNumber: "SDU/ENG/2022/1090", jerseyNumber: 10, isCaptain: true, verificationStatus: "verified" },
      { id: "p-93", fullName: "Ochuko Arigbe", email: "o.arigbe@student.sdu.edu.ng", phone: "08034567891", matricNumber: "SDU/ENG/2022/1091", jerseyNumber: 8, isCaptain: false, verificationStatus: "verified" },
      { id: "p-94", fullName: "Mudiaga Omote", email: "m.omote@student.sdu.edu.ng", phone: "08034567892", matricNumber: "SDU/ENG/2023/1188", jerseyNumber: 7, isCaptain: false, verificationStatus: "verified" },
      { id: "p-95", fullName: "Efevwere Onoriode", email: "e.onoriode@student.sdu.edu.ng", phone: "08034567893", matricNumber: "SDU/ENG/2021/0990", jerseyNumber: 9, isCaptain: false, verificationStatus: "verified" },
      { id: "p-96", fullName: "Godspower Ojarikre", email: "g.ojarikre@student.sdu.edu.ng", phone: "08034567894", matricNumber: "SDU/ENG/2023/1244", jerseyNumber: 3, isCaptain: false, verificationStatus: "verified" },
      { id: "p-97", fullName: "Tega Onokpise", email: "t.onokpise@student.sdu.edu.ng", phone: "08034567895", matricNumber: "SDU/ENG/2022/1120", jerseyNumber: 5, isCaptain: false, verificationStatus: "verified" },
      { id: "p-98", fullName: "Onome Erharhaghen", email: "o.erharhaghen@student.sdu.edu.ng", phone: "08034567896", matricNumber: "SDU/ENG/2024/1399", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-15",
    registrationId: "reg-15",
    eventId: "e-football-001",
    name: "Southern Stars",
    shortCode: "SST",
    departmentOrHall: "Vocational & Technical Education",
    captainName: "Ebiakpo Tamara",
    captainEmail: "e.tamara@student.sdu.edu.ng",
    captainPhone: "08035678901",
    captainMatric: "SDU/VTE/2022/0199",
    seedNumber: 15,
    bracketPosition: 15,
    status: "confirmed",
    createdAt: "2026-11-04T15:00:00Z",
    players: [
      { id: "p-99", fullName: "Ebiakpo Tamara", email: "e.tamara@student.sdu.edu.ng", phone: "08035678901", matricNumber: "SDU/VTE/2022/0199", jerseyNumber: 11, isCaptain: true, verificationStatus: "verified" },
      { id: "p-100", fullName: "Preye Okardi", email: "p.okardi@student.sdu.edu.ng", phone: "08035678902", matricNumber: "SDU/VTE/2022/0200", jerseyNumber: 10, isCaptain: false, verificationStatus: "verified" },
      { id: "p-101", fullName: "Timiebi Ken", email: "t.ken@student.sdu.edu.ng", phone: "08035678903", matricNumber: "SDU/VTE/2023/0288", jerseyNumber: 8, isCaptain: false, verificationStatus: "verified" },
      { id: "p-102", fullName: "Diepreye Alagoa", email: "d.alagoa@student.sdu.edu.ng", phone: "08035678904", matricNumber: "SDU/VTE/2021/0144", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
      { id: "p-103", fullName: "Boma Amangala", email: "b.amangala@student.sdu.edu.ng", phone: "08035678905", matricNumber: "SDU/VTE/2023/0315", jerseyNumber: 7, isCaptain: false, verificationStatus: "verified" },
      { id: "p-104", fullName: "Tari Wodu", email: "t.wodu@student.sdu.edu.ng", phone: "08035678906", matricNumber: "SDU/VTE/2022/0212", jerseyNumber: 3, isCaptain: false, verificationStatus: "verified" },
      { id: "p-105", fullName: "Woyengikuro Fente", email: "w.fente@student.sdu.edu.ng", phone: "08035678907", matricNumber: "SDU/VTE/2024/0400", jerseyNumber: 6, isCaptain: false, verificationStatus: "verified" },
    ],
  },
  {
    id: "team-16",
    registrationId: "reg-16",
    eventId: "e-football-001",
    name: "Ozoro Lions FC",
    shortCode: "OLC",
    departmentOrHall: "Mechanical Engineering",
    captainName: "Uchechukwu Okeke",
    captainEmail: "u.okeke@student.sdu.edu.ng",
    captainPhone: "08036789012",
    captainMatric: "SDU/MCE/2022/0510",
    seedNumber: 16,
    bracketPosition: 16,
    status: "confirmed",
    createdAt: "2026-11-04T16:30:00Z",
    players: [
      { id: "p-106", fullName: "Uchechukwu Okeke", email: "u.okeke@student.sdu.edu.ng", phone: "08036789012", matricNumber: "SDU/MCE/2022/0510", jerseyNumber: 9, isCaptain: true, verificationStatus: "verified" },
      { id: "p-107", fullName: "Somadina Eze", email: "s.eze@student.sdu.edu.ng", phone: "08036789013", matricNumber: "SDU/MCE/2022/0511", jerseyNumber: 7, isCaptain: false, verificationStatus: "verified" },
      { id: "p-108", fullName: "Chukwuma Anozie", email: "c.anozie@student.sdu.edu.ng", phone: "08036789014", matricNumber: "SDU/MCE/2023/0602", jerseyNumber: 10, isCaptain: false, verificationStatus: "verified" },
      { id: "p-109", fullName: "Ebuka Nwabueze", email: "e.nwabueze@student.sdu.edu.ng", phone: "08036789015", matricNumber: "SDU/MCE/2021/0433", jerseyNumber: 4, isCaptain: false, verificationStatus: "verified" },
      { id: "p-110", fullName: "Kenechukwu Mbah", email: "k.mbah@student.sdu.edu.ng", phone: "08036789016", matricNumber: "SDU/MCE/2023/0650", jerseyNumber: 8, isCaptain: false, verificationStatus: "verified" },
      { id: "p-111", fullName: "Chimaobi Nduka", email: "c.nduka@student.sdu.edu.ng", phone: "08036789017", matricNumber: "SDU/MCE/2022/0540", jerseyNumber: 2, isCaptain: false, verificationStatus: "verified" },
      { id: "p-112", fullName: "Obinna Opara", email: "o.opara@student.sdu.edu.ng", phone: "08036789018", matricNumber: "SDU/MCE/2024/0710", jerseyNumber: 5, isCaptain: false, verificationStatus: "verified" },
    ],
  },
];

// Seed Matches: Full 16-Match Knockout Tree (R16 = 8, QF = 4, SF = 2, 3rd = 1, Final = 1)
export const seedMatches: Match[] = [
  // Round of 16 (Matches 1-8)
  {
    id: "m-01",
    eventId: "e-football-001",
    round: "round_of_16",
    roundLabel: "Round of 16",
    matchNumber: 1,
    teamAId: "team-01", // Engineering Dynamos
    teamBId: "team-16", // Ozoro Lions FC
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
    teamAId: "team-08", // Golden Strikers
    teamBId: "team-09", // Phoenix Knights
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
    teamAId: "team-04", // Campus Titans
    teamBId: "team-13", // Redeemed Warriors
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
    teamAId: "team-05", // Agro All-Stars
    teamBId: "team-12", // SDU Invincibles
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
    teamAId: "team-02", // Ozoro City Ballers
    teamBId: "team-15", // Southern Stars
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
    teamAId: "team-07", // Red Devils SDU
    teamBId: "team-10", // Thunderbolts United
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
    teamAId: "team-03", // Delta Falcons FC
    teamBId: "team-14", // Kings of Monkey Post
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
    teamAId: "team-06", // Ozoro Spartans
    teamBId: "team-11", // Ozoro All-Stars
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
    teamAId: "team-01", // Engineering Dynamos
    teamBId: "team-08", // Golden Strikers
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
    teamAId: "team-04", // Campus Titans
    teamBId: "team-12", // SDU Invincibles
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
    teamAId: "team-02", // Ozoro City Ballers
    teamBId: "team-07", // Red Devils SDU
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
    teamAId: "team-03", // Delta Falcons FC
    teamBId: "team-06", // Ozoro Spartans
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
    teamAId: "team-01", // Engineering Dynamos
    teamBId: "team-12", // SDU Invincibles
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
    teamAId: "team-02", // Ozoro City Ballers
    teamBId: "team-03", // Delta Falcons FC
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
    roundLabel: "3rd Place Playoff (₦10,000 Prize)",
    matchNumber: 15,
    teamAId: "team-12", // SDU Invincibles (Loser SF1)
    teamBId: "team-03", // Delta Falcons FC (Loser SF2)
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
    roundLabel: "Grand Final (₦50,000 Champion / ₦20,000 Runner-up)",
    matchNumber: 16,
    teamAId: "team-01", // Engineering Dynamos (Winner SF1)
    teamBId: "team-02", // Ozoro City Ballers (Winner SF2)
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
    matchReport: "Anticipated final clash between top seeds Engineering Dynamos and Ozoro City Ballers. Live updates on Instagram & TikTok.",
  },
];

// Seed Marathon Categories & Participants
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
    matricNumber: "SDU/PHY/2022/0311",
    gender: "male",
    dateOfBirth: "2003-05-14",
    emergencyContactName: "Dr. Godwin Edafe (Father)",
    emergencyContactPhone: "08023334455",
    emergencyContactRelationship: "Father",
    medicalNotes: "No known cardiovascular issues or allergies.",
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
    matricNumber: "SDU/NUR/2023/0419",
    gender: "female",
    dateOfBirth: "2004-09-22",
    emergencyContactName: "Mrs. Grace Akpomiemie",
    emergencyContactPhone: "08039998877",
    emergencyContactRelationship: "Mother",
    medicalNotes: "Mild asthma; carries personal inhaler in pocket.",
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
    matricNumber: "SDU/ENG/2021/0812",
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
    matricNumber: "SDU/BIO/2023/0150",
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
    matricNumber: "SDU/GEO/2022/0290",
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

// Seed Marathon Results (Sample 10K results)
export const seedRaceResults: RaceResult[] = [
  {
    id: "res-01",
    raceCategoryId: "rc-10k",
    participantId: "runner-01",
    participantName: "Emmanuel Edafe",
    bibNumber: "101",
    gunTimeSeconds: 2184, // 36m 24s
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
    gunTimeSeconds: 2315, // 38m 35s
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
    gunTimeSeconds: 2472, // 41m 12s
    chipTimeSeconds: 2468,
    finishingPosition: 3,
    status: "finished",
    notes: "Top female finisher",
  },
];

// Seed Payments (16 Teams paid ₦10,000 each = ₦160,000 total registration revenue!)
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
    verifiedByName: "Finance Officer (SDU)",
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
    verifiedByName: "Finance Officer (SDU)",
    verifiedAt: "2026-11-01T15:00:00Z",
    createdAt: "2026-11-01T11:45:00Z",
  },
  {
    id: "pay-03",
    registrationId: "reg-03",
    eventId: "e-football-001",
    payerName: "Precious Oghenekaro",
    transferDate: "2026-11-01",
    amount: 10000,
    transferReference: "ZEN-TRF-2026-44321",
    status: "verified",
    verifiedBy: "admin-finance",
    verifiedByName: "Finance Officer (SDU)",
    verifiedAt: "2026-11-01T16:00:00Z",
    createdAt: "2026-11-01T12:30:00Z",
  },
  {
    id: "pay-04",
    registrationId: "reg-04",
    eventId: "e-football-001",
    payerName: "Daniel Okotete",
    transferDate: "2026-11-01",
    amount: 10000,
    transferReference: "UBA-TRF-2026-90432",
    status: "verified",
    verifiedBy: "admin-finance",
    verifiedByName: "Finance Officer (SDU)",
    verifiedAt: "2026-11-01T17:00:00Z",
    createdAt: "2026-11-01T14:00:00Z",
  },
  {
    id: "pay-05",
    registrationId: "reg-05",
    eventId: "e-football-001",
    payerName: "Faithful Igbinosa",
    transferDate: "2026-11-02",
    amount: 10000,
    transferReference: "OPAY-TRF-2026-10293",
    status: "verified",
    verifiedBy: "admin-finance",
    verifiedByName: "Finance Officer (SDU)",
    verifiedAt: "2026-11-02T12:00:00Z",
    createdAt: "2026-11-02T09:40:00Z",
  },
  {
    id: "pay-06",
    registrationId: "reg-06",
    eventId: "e-football-001",
    payerName: "Ejiro Onome",
    transferDate: "2026-11-02",
    amount: 10000,
    transferReference: "KUDA-TRF-2026-77881",
    status: "verified",
    verifiedBy: "admin-finance",
    verifiedByName: "Finance Officer (SDU)",
    verifiedAt: "2026-11-02T13:00:00Z",
    createdAt: "2026-11-02T11:00:00Z",
  },
  {
    id: "pay-07",
    registrationId: "reg-07",
    eventId: "e-football-001",
    payerName: "Osita Eze",
    transferDate: "2026-11-02",
    amount: 10000,
    transferReference: "FBN-TRF-2026-55443",
    status: "verified",
    verifiedBy: "admin-finance",
    verifiedByName: "Finance Officer (SDU)",
    verifiedAt: "2026-11-02T15:00:00Z",
    createdAt: "2026-11-02T12:15:00Z",
  },
  {
    id: "pay-08",
    registrationId: "reg-08",
    eventId: "e-football-001",
    payerName: "Komeh Ediri",
    transferDate: "2026-11-02",
    amount: 10000,
    transferReference: "PALM-TRF-2026-99210",
    status: "verified",
    verifiedBy: "admin-finance",
    verifiedByName: "Finance Officer (SDU)",
    verifiedAt: "2026-11-02T16:00:00Z",
    createdAt: "2026-11-02T13:30:00Z",
  },
  {
    id: "pay-09",
    registrationId: "reg-09",
    eventId: "e-football-001",
    payerName: "Toluwani Adeyemi",
    transferDate: "2026-11-03",
    amount: 10000,
    transferReference: "ACC-TRF-2026-33219",
    status: "verified",
    verifiedBy: "admin-finance",
    verifiedByName: "Finance Officer (SDU)",
    verifiedAt: "2026-11-03T11:00:00Z",
    createdAt: "2026-11-03T09:50:00Z",
  },
  {
    id: "pay-10",
    registrationId: "reg-10",
    eventId: "e-football-001",
    payerName: "Eromosele Akhere",
    transferDate: "2026-11-03",
    amount: 10000,
    transferReference: "FBN-TRF-2026-44129",
    status: "verified",
    verifiedBy: "admin-finance",
    verifiedByName: "Finance Officer (SDU)",
    verifiedAt: "2026-11-03T13:00:00Z",
    createdAt: "2026-11-03T11:20:00Z",
  },
  {
    id: "pay-11",
    registrationId: "reg-11",
    eventId: "e-football-001",
    payerName: "Tarila Ebikeme",
    transferDate: "2026-11-03",
    amount: 10000,
    transferReference: "GTB-TRF-2026-66712",
    status: "verified",
    verifiedBy: "admin-finance",
    verifiedByName: "Finance Officer (SDU)",
    verifiedAt: "2026-11-03T16:00:00Z",
    createdAt: "2026-11-03T14:40:00Z",
  },
  {
    id: "pay-12",
    registrationId: "reg-12",
    eventId: "e-football-001",
    payerName: "Ubong Bassey",
    transferDate: "2026-11-04",
    amount: 10000,
    transferReference: "ZEN-TRF-2026-88910",
    status: "verified",
    verifiedBy: "admin-finance",
    verifiedByName: "Finance Officer (SDU)",
    verifiedAt: "2026-11-04T11:00:00Z",
    createdAt: "2026-11-04T09:20:00Z",
  },
  {
    id: "pay-13",
    registrationId: "reg-13",
    eventId: "e-football-001",
    payerName: "Ezekiel Agbonlahor",
    transferDate: "2026-11-04",
    amount: 10000,
    transferReference: "FBN-TRF-2026-12390",
    status: "verified",
    verifiedBy: "admin-finance",
    verifiedByName: "Finance Officer (SDU)",
    verifiedAt: "2026-11-04T13:00:00Z",
    createdAt: "2026-11-04T11:40:00Z",
  },
  {
    id: "pay-14",
    registrationId: "reg-14",
    eventId: "e-football-001",
    payerName: "Oghenero Ovwigho",
    transferDate: "2026-11-04",
    amount: 10000,
    transferReference: "OPAY-TRF-2026-78342",
    status: "verified",
    verifiedBy: "admin-finance",
    verifiedByName: "Finance Officer (SDU)",
    verifiedAt: "2026-11-04T15:00:00Z",
    createdAt: "2026-11-04T13:55:00Z",
  },
  {
    id: "pay-15",
    registrationId: "reg-15",
    eventId: "e-football-001",
    payerName: "Ebiakpo Tamara",
    transferDate: "2026-11-04",
    amount: 10000,
    transferReference: "UBA-TRF-2026-45601",
    status: "verified",
    verifiedBy: "admin-finance",
    verifiedByName: "Finance Officer (SDU)",
    verifiedAt: "2026-11-04T16:30:00Z",
    createdAt: "2026-11-04T15:15:00Z",
  },
  {
    id: "pay-16",
    registrationId: "reg-16",
    eventId: "e-football-001",
    payerName: "Uchechukwu Okeke",
    transferDate: "2026-11-04",
    amount: 10000,
    transferReference: "FBN-TRF-2026-90123",
    status: "verified",
    verifiedBy: "admin-finance",
    verifiedByName: "Finance Officer (SDU)",
    verifiedAt: "2026-11-04T18:00:00Z",
    createdAt: "2026-11-04T16:45:00Z",
  },
  // Marathon registrations
  {
    id: "pay-run-01",
    registrationId: "reg-run-01",
    eventId: "e-marathon-002",
    payerName: "Emmanuel Edafe",
    transferDate: "2026-11-05",
    amount: 3000,
    transferReference: "FBN-TRF-2026-RUN01",
    status: "verified",
    verifiedBy: "admin-finance",
    verifiedByName: "Finance Officer (SDU)",
    verifiedAt: "2026-11-05T12:00:00Z",
    createdAt: "2026-11-05T10:15:00Z",
  },
  {
    id: "pay-run-02",
    registrationId: "reg-run-02",
    eventId: "e-marathon-002",
    payerName: "Blessing Akpomiemie",
    transferDate: "2026-11-05",
    amount: 3000,
    transferReference: "GTB-TRF-2026-RUN02",
    status: "verified",
    verifiedBy: "admin-finance",
    verifiedByName: "Finance Officer (SDU)",
    verifiedAt: "2026-11-05T14:00:00Z",
    createdAt: "2026-11-05T11:45:00Z",
  },
];

// Seed Media Assets (Volunteer content, TikTok & Instagram links, match photos)
export const seedMediaAssets: MediaAsset[] = [
  {
    id: "media-01",
    eventId: "e-football-001",
    mediaType: "highlight",
    title: "Chinedu Okafor Opening Goal vs Ozoro Lions (Round of 16)",
    caption: "Incredible low drive past two defenders into the bottom corner. Captured from sideline phone recording.",
    url: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80",
    platform: "instagram",
    embedCode: "https://instagram.com/p/wfc_goal_01",
    isFeatured: true,
    createdAt: "2026-11-20T17:00:00Z",
  },
  {
    id: "media-02",
    eventId: "e-football-001",
    mediaType: "video",
    title: "Golden Strikers Penalty Shootout Drama",
    caption: "Sudden death kicks from the long-distance spot in Monkey Post tie-break.",
    url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
    platform: "tiktok",
    embedCode: "https://tiktok.com/@wfc/video/shootout",
    isFeatured: true,
    createdAt: "2026-11-20T18:30:00Z",
  },
  {
    id: "media-03",
    eventId: "e-football-001",
    mediaType: "photo",
    title: "Quarter-Finals Matchday Atmosphere at SDU Pitch 1",
    caption: "Student crowd cheering their departmental teams during the intense knockout clashes.",
    url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
    platform: "local",
    isFeatured: true,
    createdAt: "2026-11-26T18:00:00Z",
  },
  {
    id: "media-04",
    eventId: "e-marathon-002",
    mediaType: "photo",
    title: "Campus 10K Route Inspection & Checkpoint Setup",
    caption: "Organizing committee marking water stations every 2.5km along the SDU perimeter road.",
    url: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80",
    platform: "local",
    isFeatured: false,
    createdAt: "2026-11-07T12:00:00Z",
  },
];

// Seed Announcements
export const seedAnnouncements: Announcement[] = [
  {
    id: "ann-01",
    eventId: "e-football-001",
    title: "Official 16-Team Random Draw Complete & Knockout Fixtures Published",
    slug: "draw-complete-fixtures-published",
    category: "fixtures",
    content: "The Tournament Committee has concluded the random draw with witnesses from student departmental associations. All 16 registered and payment-verified teams have been placed in the single-elimination bracket.",
    isPinned: true,
    publishedAt: "2026-11-19T18:00:00Z",
  },
  {
    id: "ann-02",
    eventId: "e-football-001",
    title: "Reminder: Disciplinary Card Fines & 15-Minute Walkover Grace Period",
    slug: "disciplinary-rules-and-grace-period",
    category: "disciplinary",
    content: "All captains are reminded: Yellow cards carry a ₦1,000 fine; Red cards carry a ₦3,000 fine and an automatic next-match sporting suspension. Teams must be ready on pitch within 15 minutes of scheduled kickoff or face walkover forfeit.",
    isPinned: true,
    publishedAt: "2026-11-19T20:00:00Z",
  },
  {
    id: "ann-03",
    eventId: "e-marathon-002",
    title: "Winners Marathon Challenge: Bib Collection & Medical Checkup Schedule",
    slug: "marathon-bib-collection-notice",
    category: "general",
    content: "Registered runners for both 10K Campus Elite and 5K Fun Run may collect their official numbered bibs and runner packs at the SDU Sports Center Pavilion starting Friday 8:00 AM.",
    isPinned: false,
    publishedAt: "2026-11-06T15:00:00Z",
  },
];

// Seed Audit Logs
export const seedAuditLogs: AuditLog[] = [
  {
    id: "log-01",
    adminUserId: "admin-finance",
    adminName: "Finance Officer (SDU)",
    action: "VERIFY_PAYMENT",
    entityType: "payment",
    entityId: "pay-16",
    details: "Approved ₦10,000 transfer from Uchechukwu Okeke (Ozoro Lions FC). Bank reference FBN-TRF-2026-90123 confirmed.",
    createdAt: "2026-11-04T18:00:00Z",
  },
  {
    id: "log-02",
    adminUserId: "admin-director",
    adminName: "Tournament Director",
    action: "GENERATE_DRAW",
    entityType: "event",
    entityId: "e-football-001",
    details: "Conducted random bracket seed draw for 16 confirmed teams with witnesses.",
    createdAt: "2026-11-19T17:30:00Z",
  },
  {
    id: "log-03",
    adminUserId: "admin-football",
    adminName: "Match Coordinator",
    action: "RECORD_MATCH_RESULT",
    entityType: "match",
    entityId: "m-01",
    details: "Recorded score: Engineering Dynamos 3 - 1 Ozoro Lions FC. Assessed ₦1,000 yellow card fine to Ebuka Nwabueze.",
    createdAt: "2026-11-20T15:00:00Z",
  },
];

// Simple in-memory storage manager allowing CRUD modifications
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

  // Events
  getEvents() { return this.events; }
  getEventById(id: string) { return this.events.find(e => e.id === id || e.slug === id); }
  updateEvent(updated: Partial<WSCEvent> & { id: string }) {
    this.events = this.events.map(e => e.id === updated.id ? { ...e, ...updated } : e);
    return this.getEventById(updated.id);
  }

  // Teams & Football
  getTeams(eventId?: string) {
    if (eventId) return this.teams.filter(t => t.eventId === eventId);
    return this.teams;
  }
  getTeamById(id: string) { return this.teams.find(t => t.id === id); }
  addTeam(newTeam: Team) {
    this.teams.push(newTeam);
    return newTeam;
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

    // Also update team or participant confirmation
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

// Global singleton instance
export const store = new WSCStore();
