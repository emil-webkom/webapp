export interface FormErrorProps {
  message?: string;
}

export interface FormSuccessProps {
  message?: string;
}

export interface komiteInput {
  navn: string;
  leder?: string;
  text1?: string;
  text2?: string;
  text3?: string;
  bildeurl: string;
  mail?: string;
  mappe: string;
}

export interface KomiteLogo {
  komite: string;
  bilde: string;
  mappe: string;
}

export interface Hovedstyret {
  rolle: string;
  name: string;
  text: string;
  mail: string;
  nummer: number;
  bilde: string;
}
