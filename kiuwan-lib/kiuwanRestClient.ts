import https = require('https');
import http = require('http');
import { Url } from 'url';
import seContracts = require('TFS/ServiceEndpoint/Contracts');
import seRestClient = require('TFS/ServiceEndpoint/ServiceEndpointRestClient');

var seClient = seRestClient.getClient();


seClient.getServiceEndpoints("project", "kiuwan").then(function(serviceEndpoints) {
    var seId = serviceEndpoints[0].id;

});


export class KiuwanRestClient {
    private static instance: KiuwanRestClient;

    private connectionOptions: https.RequestOptions | http.RequestOptions;

    private authString: string;
    private protocol: string ;
    private host: string;
    private port: string;
    private path: string = "/saas/rest/v1";

    private constructor(kiuwanUrl: Url, user: string, password: string) {
        // Initialize everything needed
        this.authString = `${user}:${password}`;
        this.host = ( kiuwanUrl.host.indexOf(':') == -1) ? kiuwanUrl.host : kiuwanUrl.host.substring(0,kiuwanUrl.host.indexOf(':'));
        this.port = kiuwanUrl.port;
    }

    static getClient() {
        if (!this.instance) {
            const kiuwanUrl: Url = new URL("https://wwww.kiuwan.com");
            this.instance = new KiuwanRestClient(kiuwanUrl, "jellyfish@kiuwan.com","password");

            // one time initialization stuff ...
            // Like mabe declare the the HTTP headers for the connection and stuff....
        }

        return this.instance;
    }

    public async getActionPlans(projectName: string) {
        this.setOptions("GET", `${this.path}/actionPlans?application=${projectName}`);

    }

    private setOptions(method: string, calledEndpoint: string) {
        this.connectionOptions = {
            protocol: this.protocol,
            host: this.host,
            port: this.port,
            path: calledEndpoint,
            method: method,
            rejectUnauthorized: false,
            auth: this.authString
        }

    }
    
}