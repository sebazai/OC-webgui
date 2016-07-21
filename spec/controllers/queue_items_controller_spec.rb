require 'rails_helper'
require Rails.root.to_s + '/app/controllers/queue_items_controller.rb'
require Rails.root.to_s + '/app/controllers/application_controller.rb'
require Rails.root.to_s + '/app/services/backend_service.rb'

RSpec.describe QueueItemsController, type: :controller do
  render_views

  time = Time.parse('2016-07-11T10:30:46.000Z')

  it 'queue json should work' do
    item1 = { "created_at"=>anything,
              "team"=>"Team A",
              "language"=>"English"
            }

    item2 = { "created_at"=>anything,
              "team"=>"Team B",
              "language"=>"Finnish"
            }

    Team.create(id: 1, name: "Team A")
    Team.create(id: 2, name: "Team B")
    Service.create(id: 136, name: "A", team_id: 1, language: "English")
    Service.create(id: 133, name: "B", team_id: 2, language: "Finnish")

    QueueItem.create(service_id: 136, created_at: time - 20.seconds, open: true)
    QueueItem.create(service_id: 133, created_at: time - 11.seconds, open: true)

    get :index, format: :json
    queueitems = JSON.parse(response.body)

    expect(queueitems).to include(item1)
    expect(queueitems).to include(item2)
  end

  it 'queue json should work with empty queue' do
    expected = []

    get :index, format: :json
    queueitems = JSON.parse(response.body)

    expect(queueitems).to eq(expected)
  end
end

