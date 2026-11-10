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
  | 'captain'
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

export interface CaptainAccount {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  teamId: string;
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
  
  // Dynamic Tournament Parameters (Editable from Admin)
  maxTeams: number;               // e.g. 16 Teams
  squadSize: number;              // e.g. 7 Players Roster
  playersOnPitch: number;         // e.g. 5 on Pitch
  prizePoolTotal: number;         // e.g. ₦80,000 Total Cash Prize Pool
  prizeFirst: number;             // e.g. ₦50,000 Champion
  prizeSecond: number;            // e.g. ₦20,000 Runner-up
  prizeThird: number;             // e.g. ₦10,000 Third place
  halfDurationMinutes: number;    // e.g. 20 (20 + 20 Min Regulation Match Duration)
  extraTimeMinutes: number;       // e.g. 5
  gracePeriodMinutes: number;     // e.g. 15 Mins Walkover Grace Period
  yellowCardFine: number;         // e.g. 1000
  redCardFine: number;            // e.g. 3000

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
  verificationStatus: 'unverified' | 'verified' | 'flagged';
  joinedViaInvite?: boolean;
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
  logoUrl?: string;
  captainName: string;
  captainEmail: string;
  captainPhone: string;
  inviteCode: string; // Shareable invite code for teammates to join
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
