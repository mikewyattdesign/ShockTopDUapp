# Determine if the user is old enough
class AgeGate
    def initialize(month, day, year)
        @month = month
        @day   = day
        @year  = year
    end

    def valid?
        return false unless all_fields_present?
        return false unless old_enough?
        return true
    end

    def old_enough?
        twenty_one_years_ago = Date.today.prev_year(21)
        birthdate = Date.new @year.to_i, @month.to_i, @day.to_i
        birthdate <= twenty_one_years_ago
    rescue ArgumentError
        return false
    end

    def all_fields_present?
        present?(@month) && present?(@day) && present?(@year)
    end

    def present?(value)
        !value.nil? && !value.empty?
    end
end
