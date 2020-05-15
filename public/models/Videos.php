<?phpnamespace Api\Monasteries;use Phalcon\Mvc\Model;use Phalcon\Validation;use Phalcon\Validation\Validator\InclusionIn;use Phalcon\Validation\Validator\Uniqueness;class Videos extends Model{    public function validation()    {        $validator = new Validation();        $validator->add(            'youtube',            new Uniqueness(                [                    'message' => 'Ссылка должна быть уникальной',                ]            )        );        return $this->validate($validator);    }    public function initialize()    {        $this->hasMany('id', 'Api\Monasteries\VideosLang', 'video_id', [            'alias' => 'langs'        ]);    }}