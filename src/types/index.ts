// Winners Sports Competition (WSC) Types & Data Contracts

export type EventCategoryType = 'football' | 'marathon' | 'athletics';

export type EventStatus = 
  | 'draft' 
  | 'published' 
  | 'registration_open' 
  | 'registration_closed' 
  | 'in_progress' 
  | 'completed';

export type RegistrationStatus = 
  | 'draft' 
  | 'submitted' 
  | 'under_review' 
  | 'payment_pending' 
  | 'payment_verification' 
  | 'confirmed' 
  | 'rejected' 
  | 'withdrawn';

export type PaymentStatus = 
  | 'unpaid' 
  | 'pending_verification' 
  | 'verified' 
  | 'rejected' 
  | 'refunded';

export type MatchStatus = 
  | 'scheduled' 
  | 'in_progress' 
  | 'completed' 
  | 'walkover' 
  | 'postponed' 
  | 'abandoned';

export type MatchRound = 
  | 'round_of_16' 
  | 'quarter_finals' 
  | 'semi_finals' 
  | 'third_place' 
  | 'final';

export type UserRole = 
  | 'super_admin' 
  | 'event_manager' 
  | 'football_manager' 
  | 'marathon_manager' 
  | 'finance_manager' 
  | 'participant';

export interface Profile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface WSCEvent {
  id: string;
  categoryId: EventCategoryType;
  title: string;
  slug: string;
  edition: string;
  hostInstitution: string;
  venue: string;
  description: string;
  status: EventStatus;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  registrationFee: number;
  maxParticipants: number;
  prizePoolTotal: number;
  prizeFirst: number;
  prizeSecond: number;
  prizeThird: number;
  rulesSummary: string;
  bannerUrl?: string;
  contactEmail: string;
  contactPhone: string;
  confirmedCount?: number;
}

export interface Player {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  matricNumber: string;
  verificationStatus: 'unverified' | 'verified' | 'flagged';
  studentIdCardUrl?: string;
}

export interface TeamPlayer extends Player {
  jerseyNumber: number;
  isCaptain: boolean;
}

export interface Team {
  id: string;
  registrationId: string;
  eventId: string;
  name: string;
  shortCode: string;
  departmentOrHall: string;
  logoUrl?: string;
  captainName: string;
  captainEmail: string;
  captainPhone: string;
  captainMatric: string;
  seedNumber?: number;
  bracketPosition?: number;
  status: 'pending' | 'confirmed' | 'eliminated' | 'active';
  players: TeamPlayer[];
  createdAt: string;
}

export interface MatchEvent {
  id: string;
  matchId: string;
  teamId: string;
  playerId?: string;
  playerName?: string;
  eventType: 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'var_review';
  minute: number;
  fineAmount?: number;
  fineStatus?: 'pending' | 'paid' | 'waived' | 'not_applicable';
  notes?: string;
  createdAt: string;
}

export interface Match {
  id: string;
  eventId: string;
  round: MatchRound;
  roundLabel: string;
  matchNumber: number;
  teamAId?: string;
  teamBId?: string;
  teamA?: Team;
  teamB?: Team;
  scheduledTime: string;
  pitchLocation: string;
  status: MatchStatus;
  scoreA: number;
  scoreB: number;
  isExtraTime: boolean;
  scoreAExtraTime?: number;
  scoreBExtraTime?: number;
  isPenaltyShootout: boolean;
  scoreAPenalties?: number;
  scoreBPenalties?: number;
  winnerTeamId?: string;
  walkoverAwardedTo?: string;
  refereeName?: string;
  matchCoordinatorName?: string;
  phoneOperatorName?: string;
  matchReport?: string;
  events?: MatchEvent[];
}

export interface RaceCategory {
  id: string;
  eventId: string;
  name: string;
  distanceKm: number;
  description: string;
  fee: number;
}

export interface Participant {
  id: string;
  registrationId: string;
  eventId: string;
  raceCategoryId: string;
  raceCategoryName?: string;
  fullName: string;
  email: string;
  phone: string;
  matricNumber?: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  medicalNotes?: string;
  tShirtSize: 'S' | 'M' | 'L' | 'XL' | '2XL';
  bibNumber?: string;
  checkInStatus: boolean;
  checkInTime?: string;
  createdAt: string;
}

export interface RaceResult {
  id: string;
  raceCategoryId: string;
  participantId: string;
  participantName: string;
  bibNumber: string;
  gunTimeSeconds: number;
  chipTimeSeconds: number;
  finishingPosition: number;
  status: 'finished' | 'dnf' | 'dq';
  notes?: string;
}

export interface Payment {
  id: string;
  registrationId: string;
  eventId: string;
  payerName: string;
  payerAccountNumber?: string;
  transferDate: string;
  amount: number;
  transferReference: string;
  proofReceiptUrl?: string;
  status: PaymentStatus;
  verifiedBy?: string;
  verifiedByName?: string;
  verifiedAt?: string;
  rejectionReason?: string;
  createdAt: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle?: string;
  registrationType: 'team' | 'individual';
  referenceCode: string;
  status: RegistrationStatus;
  paymentStatus: PaymentStatus;
  teamDetails?: Partial<Team>;
  participantDetails?: Partial<Participant>;
  payment?: Payment;
  adminNotes?: string;
  createdAt: string;
}

export interface MediaAsset {
  id: string;
  eventId?: string;
  mediaType: 'photo' | 'video' | 'highlight';
  title: string;
  caption?: string;
  url: string;
  thumbnailUrl?: string;
  platform: 'local' | 'instagram' | 'tiktok' | 'youtube';
  embedCode?: string;
  isFeatured: boolean;
  createdAt: string;
}

export interface Announcement {
  id: string;
  eventId?: string;
  title: string;
  slug: string;
  category: 'general' | 'fixtures' | 'disciplinary' | 'media';
  content: string;
  isPinned: boolean;
  publishedAt: string;
}

export interface AuditLog {
  id: string;
  adminUserId: string;
  adminName: string;
  action: string;
  entityType: string;
  entityId: string;
  details: string;
  ipAddress?: string;
  createdAt: string;
}
