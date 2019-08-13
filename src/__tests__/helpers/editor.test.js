import { getImageUrl } from '../../helpers/ckEditorConfig';
import editorConfigs from  '../../helpers/ckEditorConfig';
import logo from '../../assets/icons/logo.png';

describe('Testing Image Upload', () => {
    test('should reject a promise',() => {
        expect(getImageUrl('file')).rejects
    });
    test('should resolve a promise',() => {
        expect(getImageUrl(logo)).resolves
    });

    test('should return a promise',() => {
        expect(getImageUrl('file')).toBeDefined()
    });
    test('should have a key',() => {
        expect(editorConfigs).toHaveProperty('toolbar')
    });
});
