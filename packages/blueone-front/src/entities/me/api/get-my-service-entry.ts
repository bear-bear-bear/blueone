import { UserService } from '@/shared/api/services';
import * as Me from '../model/me.model';

export async function getMyServiceEntry(): Promise<string> {
  const me = await UserService.getMyInfo();

  return Me.serviceEntry(me);
}
