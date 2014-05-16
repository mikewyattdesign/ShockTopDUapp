# Adapter around the default RequestDataExtractor
class RequestDataExtractor
    include Rollbar::RequestDataExtractor
    def from_rack(env)
        extract_request_data_from_rack(env).merge(
            route: env['PATH_INFO']
        )
    end
end
