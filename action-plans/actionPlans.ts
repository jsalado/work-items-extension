import Controls = require('VSS/Controls');
import seContracts = require('TFS/ServiceEndpoint/Contracts');
import seRestClient = require('TFS/ServiceEndpoint/ServiceEndpointRestClient');

export class ActionPlans extends Controls.BaseControl {
    constructor() {
        super();
    }

    public initialize() {
        super.initialize();
        // Get configuration that's shared between extension and the extension host
        var sharedConfig = VSS.getConfiguration();
        var vsoContext = VSS.getWebContext();
        if (sharedConfig) {
            var seClient = seRestClient.getClient();

            this._element.html(`<h2>Service endpoints for project: ${vsoContext.project.name}</h2>`);

            seClient.getServiceEndpoints(vsoContext.project.name).then(serviceEndpoints => {
                if (serviceEndpoints.length == 0) {
                    this._element.add("<h3>No service endpoints found</h3>");
                }
                else {
                    $.each(serviceEndpoints,(index, serviceEndpoint) => {
                        this._element.add(`<p>Service endpoint ${index}: ${serviceEndpoint.name} id: ${serviceEndpoint.id} Type: ${serviceEndpoint.type}`);
                    })
                }

            }, reason => {
                this._element.add(`<p>Rest call failed: ${reason}</p>`);
            });
        }
    }

}

ActionPlans.enhance(ActionPlans, $('.action-plans'), {});

VSS.notifyLoadSucceeded();

