// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/src/lib/email';

const BUSINESS_EMAIL = 'info@luxpuntacana.com';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = (await request.json()) as {
      name: string;
      email: string;
      message: string;
    };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 },
      );
    }

    await sendEmail({
      to: BUSINESS_EMAIL,
      subject: `New Inquiry from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif; max-width:500px; padding:24px;">
          <h2 style="margin:0 0 16px; font-size:18px; color:#333;">New Contact Form Submission</h2>
          <p style="margin:4px 0; color:#555;"><strong>Name:</strong> ${name}</p>
          <p style="margin:4px 0; color:#555;"><strong>Email:</strong> ${email}</p>
          <hr style="border:none; border-top:1px solid #eee; margin:16px 0;" />
          <p style="margin:0; color:#333; white-space:pre-line;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[contact] Error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 },
    );
  }
}
