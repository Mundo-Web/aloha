<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Feature;
use Illuminate\Http\Request;

class FeatureController extends BasicController
{
    public $model = Feature::class;
    public $reactView = 'Admin/Features';
    public $softDeletion = false;

    public function setReactViewProperties(Request $request)
    {
        $featuresJpa = Feature::all();
        return [
            'features' => $featuresJpa
        ];
    }

    public function afterSave(Request $request, object $jpa, bool $isNew)
    {
        $feature = Feature::find($jpa->id);

        if ($isNew && $feature->after_feature == null) {
            $featureAffected = Feature::whereNull('after_feature')->where('id', '<>', $feature->id)->first();
            if ($featureAffected) {
                $featureAffected->after_feature = $feature->id;
                $featureAffected->save();
            }
        }

        return Feature::all();
    }

    public function afterDelete(Request $request, Feature $jpa)
    {
        Feature::where('after_feature', $jpa->id)->update([
            'after_feature' => $jpa->after_feature
        ]);
        return Feature::all();
    }
}
