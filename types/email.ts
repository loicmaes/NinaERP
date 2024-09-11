export interface EmailTemplate {
  html: string;
  text: string;
}
export interface EmailRequest {
  to: string;
  subject: string;
  template: EmailTemplate;
}
