// Site and Brand Configuration for Winners Sports Competition (WSC)

export const siteConfig = {
  name: "Winners Sports Competition",
  shortName: "WSC",
  tagline: "Excellence in Campus Athletics & Event Management",
  description: "The official sports competition and tournament platform for Southern Delta University, Ozoro. Hosting the Winners Football Competition (WFC) and Winners Marathon Challenge (WMC).",
  hostInstitution: "Southern Delta University, Ozoro",
  location: "Ozoro, Delta State, Nigeria",
  officialEmail: "competition@winners-sports.org",
  officialPhone: "+234 803 000 1234",
  
  // Official Banking Info for Manual Bank Transfers
  bankDetails: {
    bankName: "First Bank of Nigeria",
    accountNumber: "3123456789",
    accountName: "Winners Sports Competition Committee",
    currency: "NGN",
    currencySymbol: "₦",
  },

  // Alias used by register pages
  paymentAccount: {
    bankName: "First Bank of Nigeria",
    accountNumber: "3123456789",
    accountName: "Winners Sports Competition Committee",
  },

  // Football Configuration (WFC First Edition)
  football: {
    name: "Winners Football Competition",
    shortName: "WFC",
    edition: "First Edition",
    maxTeams: 16,
    squadSize: 7,
    playersOnPitch: 5,
    maxSubstitutions: 2,
    permanentSubstitutions: true,
    hasFixedKeeper: false,
    hasFixedPostDefender: false,
    format: "5-a-side Monkey Post Single-Elimination Knockout",
    halfDurationMinutes: 20,
    extraTimeMinutes: 5,
    gracePeriodMinutes: 15,
    registrationFee: 10000,
    prizePoolTotal: 80000,
    prizes: {
      champion: 50000,
      runnerUp: 20000,
      thirdPlace: 10000,
    },
    fines: {
      yellowCard: 1000,
      redCard: 3000,
      redCardSuspensionMatches: 1,
    },
    videoReview: {
      recordingDevice: "Designated Smartphone",
      teamReviewRequestsLimit: 1,
      refereeInitiated: true,
    },
    socialMedia: {
      instagram: "@WinnersFootballSDU",
      tiktok: "@WinnersFootballWFC",
    },
  },

  // Marathon Configuration (WMC)
  marathon: {
    name: "Winners Marathon Challenge",
    shortName: "WMC",
    edition: "First Edition",
    categories: [
      { id: "10k", name: "10K Campus Elite Challenge", distanceKm: 10, fee: 3000 },
      { id: "5k", name: "5K Campus Fun Run", distanceKm: 5, fee: 2000 },
    ],
    prizes: {
      first: 30000,
      second: 15000,
      third: 5000,
    },
    aidStationsEveryKm: 2.5,
  },

  nav: {
    public: [
      { label: "Home", href: "/" },
      { label: "Events", href: "/events" },
      { label: "Football (WFC)", href: "/football" },
      { label: "Marathon (WMC)", href: "/marathon" },
      { label: "Gallery", href: "/gallery" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    admin: [
      { label: "Dashboard", href: "/admin/dashboard", icon: "LayoutDashboard" },
      { label: "Events", href: "/admin/events", icon: "Calendar" },
      { label: "Football (WFC)", href: "/admin/football", icon: "Trophy" },
      { label: "Marathon (WMC)", href: "/admin/marathon", icon: "Timer" },
      { label: "Payment Verification", href: "/admin/payments", icon: "CreditCard" },
      { label: "Media & Assets", href: "/admin/media", icon: "Image" },
      { label: "Reports & Closeout", href: "/admin/reports", icon: "FileText" },
      { label: "Audit Logs", href: "/admin/audit", icon: "ShieldAlert" },
    ],
  },
};
