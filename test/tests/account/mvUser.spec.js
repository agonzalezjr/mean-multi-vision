describe('mvUser', () => {
  beforeEach(module('app'));

  describe('isAdmin', () => {
    
    it('should return false if not an admin in roles', inject(function(mvUser) {
      var user = new mvUser();
      user.roles = ['not an admin'];
      expect(user.isAdmin()).to.be.falsey;
    }));

    it('should return true if not an admin in roles', inject(function(mvUser) {
      var user = new mvUser();
      user.roles = ['admin'];
      expect(user.isAdmin()).to.be.true;
    }));
  });
});