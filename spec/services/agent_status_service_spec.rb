RSpec.describe AgentStatusService, type: :service do

  it "works" do
    time = Time.zone.parse("2016-07-18T08:00:00 #{Time.now.strftime("%z")}")
    t = Team.create(name: 'Helpdesk')
    a = Agent.create(first_name: "a", last_name: "b", team_id: t.id)
    AgentStatus.create(open: false, agent_id: a.id, created_at: time, closed: time + 20.minutes)
    AgentStatus.create(open: false, agent_id: a.id, created_at: time + 25.minutes, closed: time + 35.minutes) 
    AgentStatus.create(open: false, agent_id: a.id, created_at: time + (1.hour + 25.minutes), closed: time + (2.hours + 5.minutes))
    
    a = AgentStatusService.new('Helpdesk', Time.parse('2016-07-17'), Time.parse('2016-07-19'))
    expect(a.stats_by_hour).to include(10=>{free: 0, busy: 0, other: 300})
    expect(a.stats_by_hour).to include(9=>{free: 0, busy: 0, other: 2100})
    expect(a.stats_by_hour).to include(8=>{free: 0, busy: 0, other: 1800})    
  end

end
