RSpec.describe AgentsController, type: :controller do
  render_views

  it "returns all current agents in index" do
    allow_any_instance_of(AgentsController).to receive(:get_all).and_return(nil)
    Agent.create(id: 1, first_name: "keke", last_name: "x")
    Agent.create(id: 2, first_name: "spede", last_name: "x")
    get :index, format: :json
    agent1 = {
      "id"=>1,
      "first_name"=>"keke",
      "last_name"=>"x",
    }
    agent2 = {
      "id"=>2,
      "first_name"=>"spede",
      "last_name"=>"x"
    }
    expect(JSON.parse(response.body)).to include(agent1)
    expect(JSON.parse(response.body)).to include(agent2)
  end

  it "returns all current agents in index and new found from soap" do
    agents_map = [{:agent_id => 1,
                   :last_name => "x",
                   :first_name => "keke",
                   :team_name => "Helpdesk"},
                  {:agent_id => 2,
                   :last_name => "x",
                   :first_name => "spede",
                   :team_name => "Helpdesk"},
                  {:agent_id => 3,
                   :last_name => "x",
                   :first_name => "harri",
                   :team_name => "Puhelinvaihde"}]
    allow_any_instance_of(BackendService).to receive(:get_agents).and_return(nil)
    Agent.create(id: 1, first_name: "keke", last_name: "x")
    Agent.create(id: 2, first_name: "spede", last_name: "x")
    get :index, format: :json
    agent1 = {
      "id"=>1,
      "first_name"=>"keke",
      "last_name"=>"x",
    }
    agent2 = {
      "id"=>2,
      "first_name"=>"spede",
      "last_name"=>"x"
    }
    agent3 = {
      "id"=>3,
      "first_name"=>"harri",
      "last_name"=>"x",
    }
    expect(JSON.parse(response.body)).to include(agent1)
    expect(JSON.parse(response.body)).to include(agent2)
    expect(JSON.parse(response.body)).to include(agent3)
  end
end
