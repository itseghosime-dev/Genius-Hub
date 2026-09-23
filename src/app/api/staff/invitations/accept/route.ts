import { NextRequest, NextResponse } from 'next/server';
import { StaffInvitationService } from '@/lib/auth/invitation-service';
import { getPayloadClient } from '@/lib/payload';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { token?: unknown; password?: unknown; name?: unknown };
    const { token, password, name } = body || {};

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { success: false, error: 'A valid invitation token is required.' },
        { status: 400 },
      );
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          error: 'Password must be a minimum of 8 characters in length.',
        },
        { status: 400 },
      );
    }

    const payload = await getPayloadClient();

    const ipAddress =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      undefined;
    const userAgent = req.headers.get('user-agent') || undefined;

    const result = await StaffInvitationService.acceptInvitation({
      payload,
      token,
      password,
      name: typeof name === 'string' ? name : undefined,
      ipAddress,
      userAgent,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Staff account successfully activated. You may now sign in to the Admin Panel.',
        data: {
          userId: result.userId,
          email: result.email,
          name: result.name,
        },
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An error occurred while processing the invitation.';
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 400 },
    );
  }
}
