import { getSessionUserId } from '@/utils/helpers';
import { getUUID } from '@/utils/fingerprint';

export function sharedHeaders(
    path: string,
    blob: boolean = false,
    needVisitToken: boolean = false, // 访客token
) {
    let contentType = 'application/json';

    if (blob) {
        contentType = 'application/x-www-form-urlencoded';
    }
    const _shareHeader = {
        'Content-Type': contentType,
        'X-API-TOKEN': 'token',
        'X-API-ID': getSessionUserId(), // 运维要求改成取用户ID
        'X-API-UUID': getUUID(),
        mode: 'cors',
        'client-type': 'h5',
    };

    return _shareHeader;
}
