import { Navigate, useParams } from 'react-router-dom';
import { getCaseStudyBySlug } from '../lib/caseStudyRegistry';
import { SiteLayout } from '../components/Layout/SiteLayout';

export function CaseStudyPage() {
	const { slug } = useParams<{ slug: string }>();
	const study = slug ? getCaseStudyBySlug(slug) : null;

	if (!study) return <Navigate to='/' replace />;

	const Page = study.component;

	return (
		<SiteLayout showFooter={false}>
			<Page />
		</SiteLayout>
	);
}
