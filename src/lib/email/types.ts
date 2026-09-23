export interface StaffInvitationEmailParams {
  email: string;
  name: string;
  inviteUrl: string;
  roles: string[];
  expiresAt: Date;
}

export interface EmailService {
  sendStaffInvitation(
    params: StaffInvitationEmailParams,
  ): Promise<{ success: boolean; messageId?: string }>;
}
