class ContactsController < ApplicationController

	def today
		@contacts = ContactsService.new.contacts_for_team('Helpdesk', "#{Time.zone.today} 2016-06-01 00:00:00", "#{Time.zone.today} 23:59:59")
	end

end