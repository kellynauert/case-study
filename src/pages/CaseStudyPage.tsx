import { Navigate, useParams } from 'react-router-dom';
import { getCaseStudyBySlug } from '../lib/caseStudyRegistry';
import { useMarkShowcaseViewed } from '../hooks/useViewedShowcases';
import { SiteLayout } from '../components/Layout/SiteLayout';

export function CaseStudyPage() {
	const { slug } = useParams<{ slug: string }>();
	const study = slug ? getCaseStudyBySlug(slug) : null;

	useMarkShowcaseViewed(study ? slug : undefined);

	if (!study) return <Navigate to='/' replace />;

	const Page = study.component;

	return (
		<SiteLayout showFooter={false}>
			<Page />
		</SiteLayout>
	);
}
