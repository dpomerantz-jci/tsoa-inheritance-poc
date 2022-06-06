import { Controller, Body, Put, Route, SuccessResponse } from 'tsoa';
import { UserWrite } from '../models/user';

@Route('/v1/users')
export class UserController extends Controller {
  @SuccessResponse(204, 'No Content')
  @Put('{user_id}')
  async saveUser(
    @Body() user: UserWrite
  ): Promise<void> {

    user.business1 = { businessId: "foo:"};
    user.business2 = { businessId: "foo:"};
    user.business3 = { businessId: "foo:"};
    user.business4 = { businessId: "foo:"};

  }
}
