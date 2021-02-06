class Card < ApplicationRecord
    has_many :charges

    def slugify
        self.slug name.parameterize
    end

end
