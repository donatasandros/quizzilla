import {
  Body,
  Button,
  Container,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import { Base } from "@/lib/email/templates/base";

interface PasswordResetEmailProps {
  name: string;
  resetLink: string;
}

export function PasswordResetEmail({
  name,
  resetLink,
}: PasswordResetEmailProps) {
  return (
    <Base>
      <Preview>Quizzilla - reset your password</Preview>
      <Body className="mx-auto bg-gray-50 py-8">
        <Container className="bg-white p-8">
          <Section className="p-6">
            <Img
              src="https://placehold.co/139x32/png?text=Logo"
              width={139}
              height={32}
              alt="Quizzilla logo"
            />
          </Section>
          <Section className="px-6 py-8">
            <Text className="m-0 mb-4 text-gray-600">Hi {name},</Text>
            <Text className="m-0 text-gray-600">
              You requested a password reset for your Quizzilla account. If this
              was you, you can set a new password here:
            </Text>
            <Button
              href={resetLink}
              className="bg-brand-600 my-6 rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
            >
              Reset password
            </Button>
            <Text className="m-0 mb-6 text-gray-600">
              If you don&#39;t want to change your password or didn&#39;t
              request this, just ignore and delete this message.
            </Text>
            <Text className="m-0 text-gray-600">
              Thanks, <br />
              The Quizzilla team
            </Text>
          </Section>
          <Section className="px-6 py-8">
            <Text className="m-0 text-gray-600">
              © 2025 Quizzilla. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Base>
  );
}
