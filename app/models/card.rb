class Card < ApplicationRecord
    has_many :charges, :dependent => :destroy
    accepts_nested_attributes_for :charges


    # def slugify
    #     self.slug name.parameterize
    # end

end
