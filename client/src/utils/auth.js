class AuthService {
  // Apollo Client's useQuery hook can be used to fetch user data
  ME_QUERY = gql`
    query Me {
      me {
        _id
        username
        email
      }
    }
  `;

  // Check if user is logged in based on whether user data is available
  async loggedIn() {
    try {
      const { data } = await client.query({ query: this.ME_QUERY });
      return !!data.me;
    } catch (error) {
      console.error('Error checking if logged in:', error);
      return false;
    }
  }

  async login(email, password) {
    try {
      const { data } = await loginMutation({ variables: { email, password } });
      const token = data.login.token;
      return token;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  }
}

export default new AuthService();

