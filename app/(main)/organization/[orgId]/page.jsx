import getOrganization from '@/action/organization';
import OrgSwitch from '@/components/OrgSwitch';
import ProjectsList from './_components/ProjectsList';

export default async function Organization({params}) {
    const {orgId} = await params;
    const organization = await getOrganization(orgId);
    console.log(organization)

    if(!organization){
      return <h1>organization Not Found!</h1>
    }
  return (
    <div className='container mx-auto'>
      <div className='flex flex-col sm:flex-row mb-4 justify-between items-start'>
        <h1 className='text-5xl font-bold gradient-title pb-4'>{organization.name}'s projects</h1>

        <OrgSwitch />
      </div>
        <div>
          <div className='mb-4'><ProjectsList orgId={organization.id}/></div>
          <div className='mb-8'>Show user assign and reported issues here</div>
        </div>
    </div>
  )
}
