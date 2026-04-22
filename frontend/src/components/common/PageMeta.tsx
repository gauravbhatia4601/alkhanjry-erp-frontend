import { Helmet, HelmetProvider } from "react-helmet-async";

interface PageMetaProps {
  title: string;
  description?: string;
}

export const PageMeta: React.FC<PageMetaProps> = ({ title, description }) => (
  <Helmet>
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
  </Helmet>
);

export const AppWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <HelmetProvider>{children}</HelmetProvider>;
