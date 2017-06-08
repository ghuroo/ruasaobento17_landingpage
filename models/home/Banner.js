var keystone = require('keystone'),
    Types = keystone.Field.Types;

var HomeBanner = new keystone.List('HomeBanner', {
    label: 'Banner', singular: "Banner", plural: "Banners",

    track: true,
    defaultSort: '-dateStart'
});

HomeBanner.add(
    'Detalhes',
    {
        name: { type: Types.Text, initial: true, required: true, label: 'Nome' },
        image: { type: Types.CloudinaryImages, initial: true, label: 'Imagem' },

        title: { type: Types.Text, initial: true, required: true, label: 'Título' },
        subTitle: { type: Types.Text, initial: true, required: true, label: 'Sub-título' },
    },
    'Agendamento',
    {
        state: { type: Types.Select, initial: true, required: true, options: [{value: 'published', label: 'Publicado'}, {value: 'draft', label: 'Rascunho'}], default: 'draft', label: 'Estado' },
        dateStart: { type: Types.Datetime, default: Date.now, format: 'YYYY-MM-DD, HH:mm:ss', required: true, initial: true, label: 'Data de Ínicio' },
        expires: { type: Types.Boolean, default: false, label: 'Expira?' },
        dateEnd: { type: Types.Datetime, dependsOn: { expires: true }, label: 'Data de Expiração' },
    },
    'Localização',
    {
        language: { type: Types.Relationship, ref: 'Language', many: true, required: true, initial: true, label: 'Línguas' },
    }
);

// is active virtual
HomeBanner.schema.virtual('isActive').get(function() {
    var published = this.state == 'published',
        expired = this.expires && (Date.now() > this.dateEnd),
        displaying = Date.now() > this.dateStart;
    return published && !expired && displaying;
});

// validate dateEnd
HomeBanner.schema.pre('validate', function(next) {
    if (this.expires && this.dateEnd && this.dateEnd <= this.dateStart) next(Error('Expiration Date must be posterior to Display Date'));
    else next();
});

// validate expires
HomeBanner.schema.pre('validate', function(next) {
    if (this.expires && !this.dateEnd) next(Error('Expires: Expiration Date must be set'));
    else next();
});

// remove dateEnd if expires is not selected
HomeBanner.schema.pre('save', function(next) {
    if (!this.expires) this.dateEnd = ''; next();
});

HomeBanner.defaultColumns = 'name, image, language, state, expires';

HomeBanner.register();
