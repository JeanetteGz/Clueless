import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from api.queries.accounts import AccountQueries, AccountOut, Account


class ExampleAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AccountQueries,
    ):
        # Use your repo to get the account based on the
        # username (which could be an email)
        return accounts.get(username)

    def get_account_getter(
        self,
        accounts: AccountQueries = Depends(),
    ):
        # Return the accounts. That's it.
        return accounts

    def get_hashed_password(self, account: Account):
        # Return the encrypted password value from your
        # account object
        return account.password

    def get_account_data_for_cookie(self, account: Account):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return account.email, AccountOut(**account.dict())


authenticator = ExampleAuthenticator(os.environ["SIGNING_KEY"])