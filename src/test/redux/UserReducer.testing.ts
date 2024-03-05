import { LoginUserInfo, RegisterUserInfo, User, UserRole, UserToken } from "../../misc/types/User";
import userReducer, { getUserWithSession, initialState, InitialState, loginUser, registerUser } from "../../redux/slices/UserSlice";
import { userSlicerUtil } from "../../redux/utils/UserSlicerUtil";

const registerInfo: RegisterUserInfo = {
  name: 'testUserName',
  email: 'testUserEmail@mail.com',
  password: 'testUserPassword',
  avatar: 'testUserAvatar',
  role: UserRole.CUSTOMER
}

const registeredInfo: User = {
  ...registerInfo,
  id: 1
}

const loginInfo: LoginUserInfo = {
  email: 'testUserEmail@mail.com',
  password: 'testUserPassword'
}

const userToken: UserToken = {
  access_token: 'access_token',
  refresh_token: 'refresh_token'
}

describe("Products reducer: register user", () => {
  // inital state
  test("should return initial state", () => {
    const state = userReducer(undefined, { type: ""});
    expect(state).toEqual(initialState);
  });

  test("should register a user, return no error", () => {
    const state: InitialState = userReducer(
      initialState,
      registerUser.fulfilled(registeredInfo, 'registerUser', registerInfo)
    );

    expect(state).toEqual({
      user: null,
      loading: false
    });
  });

  // test: fetchProducts.pending
  test("should have loading truthy when it is pending", () => {
    const state = userReducer(
      initialState,
      registerUser.pending('registerUser', registerInfo)
    );

    expect(state).toEqual({
      user: null,
      loading: true,
      error: undefined
    });
  });

  // test: registerUser.reject
  test("should have an error", () => {
    const error: Error = new Error('error'); 
    const state = userReducer(
      initialState,
      registerUser.rejected(error, 'fetchProducts', registerInfo)
    );

    expect(state).toEqual({
      user: null,
      loading: false,
      error: error.message
    });
  });
});

describe("Products reducer: login user", () => {
  // inital state
  test("should return initial state", () => {
    const state = userReducer(undefined, { type: ""});
    expect(state).toEqual(initialState);
  });

  test("should login and get token", () => {
    const state: InitialState = userReducer(
      initialState,
      loginUser.fulfilled(userToken, 'loginUser', loginInfo)
    );

    // Token is saved in localStroage
    // In reducer, not handling it
    expect(state).toEqual({
      user: null,
      loading: false
    });

    // Check token is saved in localStroage
    const savedTokens: UserToken | null = userSlicerUtil.getTokensToLocalStorage();
    expect(savedTokens).toEqual(userToken);
  });

  // test: registerUser.pending
  test("should have loading truthy when it is pending", () => {
    const state = userReducer(
      initialState,
      loginUser.pending('loginUser', loginInfo)
    );

    expect(state).toEqual({
      user: null,
      loading: true,
      error: undefined
    });
  });

  // test: loginUser.reject
  test("should have an error", () => {
    const error: Error = new Error('error'); 
    const state = userReducer(
      initialState,
      loginUser.rejected(error, 'loginUser', loginInfo)
    );

    expect(state).toEqual({
      user: null,
      loading: false,
      error: error.message
    });
  });
});

describe("Products reducer:  user with session", () => {
  // inital state
  test("should return initial state", () => {
    const state = userReducer(undefined, { type: ""});
    expect(state).toEqual(initialState);
  });

  test("should get a user with session token", () => {
    // Check token is saved in localStroage
    const savedTokens: UserToken | null = userSlicerUtil.getTokensToLocalStorage();
    expect(savedTokens).toEqual(userToken);
    
    const state: InitialState = userReducer(
      initialState,
      getUserWithSession.fulfilled(registeredInfo, 'getUserWithSession')
    );

    expect(state).toEqual({
      user: registeredInfo,
      loading: false
    });
  });

  // test: getUserWithSession.pending
  test("should have loading truthy when it is pending", () => {
    const state = userReducer(
      initialState,
      getUserWithSession.pending('getUserWithSession')
    );

    expect(state).toEqual({
      user: null,
      loading: true,
      error: undefined
    });
  });

  // test: getUserWithSession.reject
  test("should have an error", () => {
    const error: Error = new Error('error'); 
    const state = userReducer(
      initialState,
      getUserWithSession.rejected(error, 'getUserWithSession')
    );

    expect(state).toEqual({
      user: null,
      loading: false,
      error: error.message
    });
  });
});