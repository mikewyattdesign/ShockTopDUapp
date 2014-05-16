# Handle querying the user's age via Facebook's signed_request
class Facebook
    def initialize(signed_request)
        @facebook_app_id     = ENV['FACEBOOK_APP_ID']
        @facebook_app_secret = ENV['FACEBOOK_APP_SECRET']
        @signed_request_hash = signed_request
    end

    def old_enough?
        return false unless @facebook_app_id && @facebook_app_secret && signed_request?
        @oauth = Koala::Facebook::OAuth.new(@facebook_app_id, @facebook_app_secret)

        signed_request = @oauth.parse_signed_request(@signed_request_hash)
        user = signed_request ? signed_request['user'] : nil

        if user && user['age'] && user['age']['min'] >= 21
            return true
        else
            return false
        end
    end

    def signed_request?
        present? @signed_request_hash
    end

    def present?(value)
        !value.nil? && !value.empty?
    end
end
