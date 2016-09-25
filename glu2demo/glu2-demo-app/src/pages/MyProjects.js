import React from 'react';
import BasePage from '../components/BasePage';
import OrganizationGroupList from '/components/projectsList/OrganizationGroupList';

class MyProjects extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            organizations: [],
        };
        this.bindGluBusEvents({
            IDENTITIES_RETRIEVED: this.onIdentitiesRetrieved,
        });
        this.emit('RETRIEVE_IDENTITIES', { forCurrentUser: true });
    }

    componentWillUnmount() {
        this.unbindGluBusEvents();
    }

    onIdentitiesRetrieved(organizations) {
        this.setState({
            organizations,
        });
    }

    render() {
        const organizations = this.state.organizations.map(organization => {
            return (<OrganizationGroupList
                key={organization.id}
                organization={organization}/>);
        });
        return (<div>
                <div id="organizations">{organizations}</div>
            </div>);
    }
}

export default MyProjects;
