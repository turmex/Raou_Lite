import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    schema?: Record<string, any>;
    image?: string;
    url?: string;
}

export const SEO = ({ title, description, schema, image, url }: SEOProps) => {
    const siteTitle = 'Raou Travel';
    const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
    const baseUrl = 'https://raou-travel.com'; // Replace with actual domain when live
    const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
    const fullImage = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : `${baseUrl}/assets/logo.png`;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={fullImage} />

            {/* JSON-LD Schema for AI/LLMs */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};
