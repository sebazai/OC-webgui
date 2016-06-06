describe('homepage', function() {
    it('should automatically redirect to /home', function() {
        browser.get('');
        expect(browser.getLocationAbsUrl()).toMatch('/home');
    });
    it('should contain header', function() {
        browser.get('#/home');
        expect(element(by.tagName('h1')).getText()).toBe('Home');
    });
});

describe('screen', function() {
    beforeEach(function() {
        browser.addMockModule('httpBackendMock', function() {
            angular.module('httpBackendMock', ['ngMockE2E'])
                .run(function($httpBackend) {
                    $httpBackend.whenGET('agents.json').respond([
                        {
                            id: 1,
                            agent_id: 1234,
                            name: 'Kekkonen Benjamin',
                            team: 'Helpdesk',
                            status: 'TAUKO',
                            time_in_status: 6485
                        },
                        {
                            id: 2,
                            agent_id: 4321,
                            name: 'Kanerva Aallotar',
                            team: 'Helpdesk',
                            status: 'Sisäänkirjaus',
                            time_in_status: 1278
                        }
                    ]);
                });
        });
    });

    it('should something', function() {
        browser.get('#/screen');
        var agentCards = element.all(by.className('agent-card'));
        expect(agentCards.count()).toBe(2);  
        expect(agentCards.get(0).element(by.className('agent-name')).getText()).toBe('Kekkonen Benjamin');
        expect(agentCards.get(0).element(by.className('agent-status')).getText()).toBe('TAUKO');
        expect(agentCards.get(1).element(by.className('agent-name')).getText()).toBe('Kanerva Aallotar');
        expect(agentCards.get(1).element(by.className('agent-status')).getText()).toBe('Sisäänkirjaus');
    });

    it('should filter correctly', function() {
        browser.get('#/screen');
        element(by.linkText('rajaa')).click();
        element(by.id('TAUKO')).click();
        element(by.linkText('Show state screen')).click();
        var agentCards = element.all(by.className('agent-card'));
        expect(agentCards.count()).toBe(1);
        expect(agentCards.get(0).element(by.className('agent-name')).getText()).toBe('Kanerva Aallotar');
        expect(agentCards.get(0).element(by.className('agent-status')).getText()).toBe('Sisäänkirjaus');
    });
});

describe('queue', function() {
    beforeEach(function() {
        browser.addMockModule('httpBackendMock', function() {
            angular.module('httpBackendMock', ['ngMockE2E'])
                .run(function($httpBackend) {
                    $httpBackend.whenGET('queue.json').respond([
                        {
                            line: 136,
                            label: "sssssssss",
                            time_in_queue: 265,
                        },
                        {
                            line: 133,
                            label: "zzzzz",
                            time_in_queue: 73,
                        }
                    ]);
                });
        });
    });

    it('should something', function() {
        browser.get('#/queue');
        var queue = element.all(by.className('queuer'));

        expect(queue.count()).toBe(2);

        expect(queue.get(0).element(by.className('queuer-time')).getText()).toBe('04:25');
        expect(queue.get(0).element(by.className('queuer-flag')).getAttribute('class')).toMatch('queuer-flag-Fin');

        expect(queue.get(1).element(by.className('queuer-time')).getText()).toBe('01:13');
        expect(queue.get(1).element(by.className('queuer-flag')).getAttribute('class')).toMatch('queuer-flag-Swe');
    });
});
