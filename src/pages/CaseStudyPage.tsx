import { Navigate, useParams } from 'react-router-dom';
import { getCaseStudyBySlug } from '../lib/caseStudies';
import { CaseStudyContent } from '../components/markdown/CaseStudyContent';
import { SiteLayout } from '../components/Layout/SiteLayout';

export function CaseStudyPage() {
	const { slug } = useParams<{ slug: string }>();
	const study = slug ? getCaseStudyBySlug(slug) : null;

	if (!study) return <Navigate to='/' replace />;

	return (
		<SiteLayout showFooter={false}>
			<CaseStudyContent raw={study.raw} />
		</SiteLayout>
	);
}
