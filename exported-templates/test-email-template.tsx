import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Row,
  Column,
  Text,
  Heading,
  Button,
  Img,
  Hr,
  Link,
  Preview,
} from "@react-email/components"

export function EmailTemplate() {
  return (
    <Html lang="en">
      <Head />
      
      <Body
        style={{
          backgroundColor: "#f3f4f6",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif",
          margin: 0,
          padding: "40px 20px",
        }}
      >
        <Container
          style={{
            maxWidth: 600,
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: 8,
            padding: 24,
          }}
        >
        <Section style={{ marginBottom: 16 }}>
          <Row>
            <Column style={{ width: 52 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#f3f4f6",
                  borderRadius: 4,
                }}
              />
            </Column>
            <Column style={{ paddingLeft: 12 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#000000",
                  margin: 0,
                }}
              >
                Your Brand
              </Text>
            </Column>
          </Row>
        </Section>
        <Heading
          as="h1"
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "#000000",
            textAlign: "center",
            margin: "0 0 16px 0",
          }}
        >
          &lt;p&gt;welcome to ReacherX&lt;/p&gt;
        </Heading>
        <Section style={{ textAlign: "center", marginBottom: 16 }}>
          <Img
            src="https://pbs.twimg.com/media/GmXCQTQXgAAQo4T.jpg"
            alt="Image description"
            width={600}
            style={{
              borderRadius: 4,
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </Section>
        <Section style={{ textAlign: "center", marginBottom: 16 }}>
          <Button
            href="https://example.com"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              fontSize: 16,
              fontWeight: 500,
              color: "#ffffff",
              backgroundColor: "#000000",
              textDecoration: "none",
              borderRadius: 4,
            }}
          >
            Click Here
          </Button>
        </Section>
        <Text
          style={{
            fontSize: 14,
            lineHeight: 1.6,
            color: "#6b7280",
            textAlign: "center",
            margin: "0 0 16px 0",
            whiteSpace: "pre-line",
          }}
        >
          © 2026 Your Company. All rights reserved.
Unsubscribe | Privacy Policy
        </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default EmailTemplate
