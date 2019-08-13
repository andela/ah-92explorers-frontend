import fetchImage from '../../helpers/createDisplayImage';

describe('Testing Image Display Function', () => {
    test('should return undefined supplied no body tag',() => {
        expect(fetchImage('file')).toBe(undefined)
    });
    test('should return image url supplied body tag',() => {
        const image = '<p>Where have you been</p><figure class="image"><img src="http://res.cloudinary.com/kodek-sleuth/image/upload/v1567441531/x9cnllynzejhsviwhmhy.png"></figure>';
        expect(fetchImage(image)).toBe('http://res.cloudinary.com/kodek-sleuth/image/upload/v1567441531/x9cnllynzejhsviwhmhy.png')
    });

});